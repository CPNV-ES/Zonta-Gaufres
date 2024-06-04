import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";
import { Badge } from "@/Components/ui/badge";

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
    }
];

const columns = builder.buildColumns(columnHeaders);

const People = (people) => {
    return (
        <MainLayout color="yellow" subject="Personnel">
            <DataTable
                columns={columns}
                inputData={people.people}
                buttonsOptions={{
                    icon: "plus",
                    action: "Ajouter une personne",
                    variant: "yellow",
                }}
            />
        </MainLayout>
    );
};

export default People;
