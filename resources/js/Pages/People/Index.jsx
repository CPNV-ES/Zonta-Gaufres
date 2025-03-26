import React, { useState } from "react";
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

const People = (people) => {
    const builder = new ColumnBuilder();
    
    const typesAvailable = () => {
        let types = [];
        people.people.forEach(person => {
            return person.types.map((type) => {
                if (!types.find((el) => el.key === type.key)) {
                    types.push({ key: type.key, name: type.name });
                }
            });
        });
        return types;
    }

    const columnHeaders = [
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
                    <button
                        onClick={() => handleEdit(row.row.original)}
                    >
                        <Icon name="pencil" />
                    </button>
                </div>
            ),
        },
    ];

    const columns = builder.buildColumns(columnHeaders);

    const OPTIONS = [
        { label: "Bénévole", value: "Bénévole" },
        { label: "Livreur", value: "Livreur" },
        { label: "Admin", value: "Admin" },
        { label: "Client", value: "Client" },
    ];

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [input, setInput] = useState({
        firstname: "",
        lastname: "",
        email: "",
        company: "",
        phone_number: "",
        roles: [],
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
            roles: person.types.map((role) => role.name),
        });
        setCurrentPersonId(person.id);
        setIsEditing(true);
        setIsDialogOpen(true);
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!input.firstname) newErrors.firstname = "Prénom est requis";
        if (!input.lastname) newErrors.lastname = "Nom est requis";
        if (!input.email) {
            newErrors.email = "Email est requis";
        } else if (!EMAIL_REGEX.test(input.email)) {
            newErrors.email = "Email invalide";
        }
        if (!input.phone_number) {
            newErrors.phone_number = "Téléphone est requis";
        } else if (!PHONENUMBER_REGEX.test(input.phone_number)) {
            newErrors.phone_number = "Téléphone invalide";
        }
        if (input.roles.length === 0) {
            newErrors.roles = "Au moins un rôle est requis";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateInputs()) return;

        if (isEditing) {
            router.put(`/people/${currentPersonId}`, {
                firstname: input.firstname,
                lastname: input.lastname,
                email: input.email,
                company: input.company,
                phone_number: input.phone_number,
                roles: input.roles,
            });
        } else {
            router.post("/people", {
                firstname: input.firstname,
                lastname: input.lastname,
                email: input.email,
                company: input.company,
                phone_number: input.phone_number,
                roles: input.roles,
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
            roles: [],
        });
        window.location.reload();
    };

    return (
        <MainLayout color="yellow" subject="Personnel">
            <DataTable
                columns={columns}
                inputData={people.people}
                buttonsOptions={{
                    icon: "plus",
                    action: "Ajouter une personne",
                    variant: "yellow",
                    handler: () => {
                        setInput({
                            firstname: "",
                            lastname: "",
                            email: "",
                            company: "",
                            phone_number: "",
                            roles: [],
                        });
                        setIsEditing(false);
                        setIsDialogOpen(true);
                    },
                }}
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
                    inputProps={input.roles}
                    value={input.roles.map((role) =>
                        OPTIONS.find((el) => el.value === role)
                    )}
                    onChange={(e) => {
                        setInput({ ...input, roles: e.map((el) => el.value) });
                    }}
                />
                {errors.roles && <p className="text-red-500">{errors.roles}</p>}
            </Dialog>
        </MainLayout>
    );
};

export default People;
