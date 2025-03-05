import React, { useState } from "react";
import MainLayout from "../../Layouts/MainLayout";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";

import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";

import DataTable from "@/Components/DataTable";
import Dialog from "@/Components/Dialog";
import MultipleSelector from "@/Components/MultipleSelector";

import { router } from "@inertiajs/react";

const People = (people) => {
    const builder = new ColumnBuilder();

    const columnHeaders = [
        {
            accessor: "lastname",
            header: "Nom",
        },
        {
            accessor: "firstname",
            header: "Prénom",
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
        },
        {
            accessor: "phone_number",
            header: "Téléphone",
        },
        {
            accessor: "email",
            header: "Email",
        },
        {
            accessor: "orders_count",
            header: "Nb commandes",
        },
        {
            accessor: "actions",
            header: "Actions",
            cell: (row) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => handleEdit(row.row.original)}
                        className="text-blue-500 hover:underline"
                    >
                        Editer
                    </button>
                </div>
            ),
        },
    ];

    const columns = builder.buildColumns(columnHeaders);

    // values must be in French to allow search by French words
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

    const handleSubmit = () => {
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
                <Input
                    id="lastname"
                    placeholder="Nom"
                    value={input.lastname}
                    onChange={(e) =>
                        setInput({ ...input, lastname: e.target.value })
                    }
                />
                <Input
                    id="email"
                    placeholder="Email"
                    value={input.email}
                    onChange={(e) =>
                        setInput({ ...input, email: e.target.value })
                    }
                />
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
                    placeholder="Téléphone"
                    value={input.phone_number}
                    onChange={(e) =>
                        setInput({ ...input, phone_number: e.target.value })
                    }
                />
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
            </Dialog>
        </MainLayout>
    );
};

export default People;
