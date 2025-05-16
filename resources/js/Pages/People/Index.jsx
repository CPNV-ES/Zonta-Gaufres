import React, { useState, useEffect } from "react";
import MainLayout from "../../Layouts/MainLayout";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";

import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import Icon from "@/Components/Icon";

import DataTable from "@/Components/DataTable";
import Dialog from "@/Components/Dialog";
import MultipleSelector from "@/Components/MultipleSelector";

import { router } from "@inertiajs/react";

import { PHONENUMBER_REGEX, EMAIL_REGEX } from "@/lib/regex";
import { set } from "date-fns";

import { Checkbox } from "@/Components/ui/checkbox";


const People = (base_people) => {
    const builder = new ColumnBuilder();
    const [people, setPeople] = useState(base_people.people);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
        useState(false);
    const [currentDeletePerson, setCurrentDeletePerson] = useState(null);

    const typesAvailable = () => {
        let types = [];
        people.forEach((person) => {
            return person.types.map((type) => {
                if (!types.find((el) => el.key === type.key)) {
                    types.push({ key: type.key, name: type.name });
                }
            });
        });
        return types;
    };

    const columnHeaders = [
        {
            accessor: "select",
            cell: ({ row }) => (
                <Checkbox
                    {...{
                        checked:
                            table.getIsAllRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate"),
                        onCheckedChange: (value) =>
                            table.toggleAllPageRowsSelected(!!value),
                    }}
                />
            ),
            cell: ({ row }) => {
                const hasLivreurRole = row.original.types.some(
                    (type) => type.name === "Livreur"
                );

                return hasLivreurRole ? (
                    <Checkbox
                        {...{
                            checked: row.getIsSelected(),
                            onCheckedChange: row.getToggleSelectedHandler(),
                        }}
                    />
                ) : null;
            },
        },

        {
            accessor: "lastname",
            header: "Nom",
            type: "string",
        },
        {
            accessor: "firstname",
            header: "Prénom",
            type: "string",
        },
        {
            accessor: "types",
            header: "Rôle",
            cell: (row) => (
                <div className="flex gap-2">
                    {row.getValue().map((badge) => (
                        <Badge key={badge.key} variant={badge.key}>
                            {badge.name}
                        </Badge>
                    ))}
                </div>
            ),
            type: "multi",
            multi: typesAvailable(),
        },
        {
            accessor: "phone_number",
            header: "Téléphone",
            type: "string",
        },
        {
            accessor: "email",
            header: "Email",
            type: "string",
        },
        {
            accessor: "orders_count",
            header: "Nb commandes",
            type: "number",
        },
        {
            accessor: "actions",
            header: "Actions",
            cell: (row) => (
                <div className="flex gap-2">
                    <button onClick={() => handleEdit(row.row.original)}>
                        <Icon name="pencil" />
                    </button>
                    <button
                        onClick={() => {
                            setCurrentDeletePerson(row.row.original);
                            setIsDeleteConfirmationOpen(true);
                        }}
                    >
                        <Icon name="trash" />
                    </button>
                </div>
            ),
        },
    ];

    const columns = builder.buildColumns(columnHeaders);

    const OPTIONS = [
        { label: "Bénévole", value: "STAFF" },
        { label: "Livreur", value: "DELIVERY_GUY" },
        { label: "Admin", value: "ADMIN" },
        { label: "Client", value: "CLIENT" },
    ];

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        email: "",
        company: "",
        phone_number: "",
        types: [],
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentPersonId, setCurrentPersonId] = useState(null);
    const [errors, setErrors] = useState({});

    const handleEdit = (person) => {
        setInput({
            firstname: person.firstname,
            lastname: person.lastname,
            email: person.email,
            company: person.company,
            phone_number: person.phone_number,
            types: person.types.map((type) => ({
                label: type.name,
                value: type.key,
            })),
        });
        setCurrentPersonId(person.id);
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    const handleDelete = (person) => {
        router.post(`/people/${person.id}`, { _method: "DELETE" }, {
            onSuccess: () => {
                window.location.reload();
            },
        });
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!input.email) {
            newErrors.email = "Email est requis";
        } else if (!EMAIL_REGEX.test(input.email)) {
            newErrors.email = "Email invalide";
        }
        if (!PHONENUMBER_REGEX.test(input.phone_number) && input.phone_number) {
            newErrors.phone_number = "Téléphone invalide";
        }
        if (input.types.length === 0) {
            newErrors.types = "Au moins un rôle est requis";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateInputs()) return;

        const payload = {
            firstname: input.firstname,
            lastname: input.lastname,
            email: input.email,
            company: input.company,
            phone_number: input.phone_number,
            types: input.types.map((role) => role.value),
        };

        if (isEditing) {
            router.post(`/people/${currentPersonId}`, { ...payload, _method: 'PUT' }, {
                onSuccess: () => {
                    window.location.reload();
                },
            });
        } else {
            router.post("/people", payload, {
                onSuccess: () => {
                    window.location.reload();
                },
            });
        }
        setIsDialogOpen(false);
        setIsEditing(false);
        setInput({
            firstname: "",
            lastname: "",
            email: "",
            company: "",
            phone_number: "",
            types: [],
        });
    };

    const handleDevliverySheet = (rowSelection)=> {
        const selectedRows = Object.keys(rowSelection).filter(key => rowSelection[key]);
        if(selectedRows.length === 0){
            return;
        }
        const selectedIds = selectedRows.map(row => people[row].id);
        window.location.href=`/people/print_delivery_sheet?sheets=${selectedIds.join(",")}`;
    };

    return (
        <MainLayout color="yellow" subject="Contacts">
            <Dialog
                title="Êtes-vous sûr de vouloir supprimer cette personne ?"
                buttonLabel="Supprimer"
                buttonVariant="red"
                action={() => {
                    handleDelete(currentDeletePerson);
                    setIsDeleteConfirmationOpen(false);
                }}
                isOpen={isDeleteConfirmationOpen}
                setIsOpen={setIsDeleteConfirmationOpen}
            >
                <p className="text-sm text-gray-500">
                    Cette action est définitive. Une fois supprimée, cette
                    personne ne pourra pas être récupérée. Si elle est associée
                    à une commande, celle-ci sera également supprimée.
                </p>
            </Dialog>
            <DataTable
                columns={columns}
                inputData={people}
                buttonsOptions={[
                    {
                        id : "create_person",
                        icon: "plus",
                        action: "Ajouter une personne",
                        variant: "yellow",
                        alwaysOn: true,
                        handler: () => {
                            setInput({
                                firstname: "",
                                lastname: "",
                                email: "",
                                company: "",
                                phone_number: "",
                                types: [],
                            });
                            setIsEditing(false);
                            setIsDialogOpen(true);
                        },
                    },
                    {
                        id: "print_delivery_sheet",
                        icon: "printer",
                        action: "Imprimer",
                        item:"fiche de livraison",
                        itemPlural:"fiches de livraison",
                        handler: handleDevliverySheet,
                        variant: "yellow",
                        alwaysOn: false
                    },
                ]}
            />
            <Dialog
                title={
                    isEditing ? "Modifier une personne" : "Ajouter une personne"
                }
                description=""
                buttonLabel={isEditing ? "Mettre à jour" : "Sauvegarder"}
                action={handleSubmit}
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
            >
                <Input
                    id="lastname"
                    placeholder="Nom"
                    value={input.lastname}
                    onChange={(e) =>
                        setInput({ ...input, lastname: e.target.value })
                    }
                />
                {errors.lastname && (
                    <p className="text-red-500">{errors.lastname}</p>
                )}
                <Input
                    id="firstname"
                    placeholder="Prénom"
                    value={input.firstname}
                    onChange={(e) =>
                        setInput({ ...input, firstname: e.target.value })
                    }
                />
                {errors.firstname && (
                    <p className="text-red-500">{errors.firstname}</p>
                )}
                <Input
                    id="email"
                    placeholder="Email"
                    value={input.email}
                    onChange={(e) =>
                        setInput({ ...input, email: e.target.value })
                    }
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
                <Input
                    id="company"
                    placeholder="Entreprise"
                    value={input.company}
                    onChange={(e) =>
                        setInput({ ...input, company: e.target.value })
                    }
                />
                <Input
                    id="phone_number"
                    placeholder="Téléphone (Format: 024 102 33 04)"
                    value={input.phone_number}
                    onChange={(e) =>
                        setInput({ ...input, phone_number: e.target.value })
                    }
                />
                {errors.phone_number && (
                    <p className="text-red-500">{errors.phone_number}</p>
                )}
                <MultipleSelector
                    defaultOptions={OPTIONS}
                    placeholder="Sélectionner le(s) rôle(s)"
                    hidePlaceholderWhenSelected={true}
                    emptyIndicator={
                        <p className="text-lg leading-10 text-center text-gray-600 dark:text-gray-400">
                            Aucun rôle trouvé
                        </p>
                    }
                    inputProps={input.types}
                    value={input.types.map((role) =>
                        OPTIONS.find((el) => el.value === role.value)
                    )}
                    onChange={(e) => {
                        setInput({ ...input, types: e });
                    }}
                />
                {errors.types && <p className="text-red-500">{errors.types}</p>}
            </Dialog>
        </MainLayout>
    );
};

export default People;
