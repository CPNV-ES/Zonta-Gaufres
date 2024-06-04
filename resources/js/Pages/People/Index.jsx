import React, { useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import Dialog from "@/Components/Dialog";
import MultipleSelector from "@/Components/MultipleSelector";

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
];

const columns = builder.buildColumns(columnHeaders);

const OPTIONS = [
    { label: "Bénévole", value: "STAFF" },
    { label: "Livreur", value: "DELIVERY_GUY" },
    { label: "Admin", value: "ADMIN" },
];

const People = (people) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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
                        setIsDialogOpen(true);
                    },
                }}
            />
            <Dialog
                action={console.log("ysdasd")}
                title="Ajouter une personne"
                description=""
                buttonLabel="Sauvegarder"
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
            >
                <Input id="firstname" placeholder="Prénom" />
                <Input id="lastname" placeholder="Nom" />
                <Input id="email" placeholder="Email" />
                <Input id="company" placeholder="Entreprise" />
                <Input id="phone_number" placeholder="Téléphone" />
                <MultipleSelector
                    defaultOptions={OPTIONS}
                    placeholder="Sélectionner le(s) rôle(s)"
                    emptyIndicator={
                        <p className="text-lg leading-10 text-center text-gray-600 dark:text-gray-400">
                            Aucun rôle trouvé
                        </p>
                    }
                />
            </Dialog>
        </MainLayout>
    );
};

export default People;
