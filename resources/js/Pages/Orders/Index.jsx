import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";
import { Badge } from "@/Components/ui/badge";

const builder = new ColumnBuilder();

const columnHeaders = [
    { accessor: "invoice_id", header: "#" },
    { accessor: "company", header: "Entreprise" },
    { accessor: "client", header: "Client" },
    { accessor: "address", header: "Adresse" },
    { accessor: "zip_code", header: "NPA" },
    { accessor: "city", header: "Localité" },
    { accessor: "note", header: "Remarque" },
    { accessor: "gifted_by", header: "Offert par" },
    { accessor: "delivery_guy", header: "Livreur" },
    { accessor: "time_slot", header: "Plage horaire" },
    { accessor: "contact", header: "Contact année passée" },
    { accessor: "waffles_number", header: "Nombre de gaufres" },
    {
        accessor: "total",
        header: "Total",
        cell: (info) => `${info.renderValue()} CHF`,
    },
    {
        accessor: "status",
        header: "Statut facture",
        cell: (row) => (
            <Badge variant={row.renderValue().key}>
                {row.renderValue().name}
            </Badge>
        ),
    },
    {
        accessor: "payment_type",
        header: "Encaissement",
        cell: (row) => (
            <Badge variant={row.renderValue().key}>
                {row.renderValue().name}
            </Badge>
        ),
    },
];

const columns = builder.buildColumns(columnHeaders);

const Index = (orders) => {
    orders = orders.orders;
    return (
        <MainLayout color="green" subject="Commandes">
            <DataTable
                columns={columns}
                inputData={orders}
                buttonsOptions={{
                    icon: "plus",
                    action: "Créer une commande",
                    variant: "green",
                    handler: (a) => window.location.href = "/orders/create",
                    alwaysOn: true
                }}
                onClickHandler={(row) => console.log(row.id)}
            />
        </MainLayout>
    );
};

export default Index;
