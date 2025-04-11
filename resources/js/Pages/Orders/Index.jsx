import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";
import { Badge } from "@/Components/ui/badge";

const Index = (orders) => {
    const builder = new ColumnBuilder();

    const statusAvailable = () => {
        let statuses = [];
        orders.orders.forEach(order => {
            if (!statuses.find((el) => el.key === order.status.key)) {
                statuses.push({ key: order.status.key, name: order.status.name });
            }
        });
        return statuses;
    };

    const paymentTypesAvailable = () => {
        let paymentTypes = [];
        orders.orders.forEach(order => {
            if (!paymentTypes.find((el) => el.key === order.payment_type.key)) {
                paymentTypes.push({ key: order.payment_type.key, name: order.payment_type.name });
            }
        });
        return paymentTypes;
    };

    const columnHeaders = [
        { accessor: "invoice_id", header: "#", type: "number" },
        { accessor: "company", header: "Entreprise", type: "string" },
        { accessor: "client", header: "Client", type: "string" },
        { accessor: "address", header: "Adresse", type: "string" },
        { accessor: "zip_code", header: "NPA", type: "number" },
        { accessor: "city", header: "Localité", type: "string" },
        { accessor: "note", header: "Remarque", type: "string" },
        { accessor: "gifted_by", header: "Offert par", type: "string" },
        { accessor: "delivery_guy", header: "Livreur", type: "string" },
        { accessor: "time_slot", header: "Plage horaire", type: "string" },
        { accessor: "contact", header: "Contact année passée", type: "string" },
        { accessor: "waffles_number", header: "Nombre de gaufres", type: "number" },
        {
            accessor: "total",
            header: "Total",
            cell: (info) => {
                const isFree = info.row.original.free; // Assuming `free` is a boolean in the row data
                return (
                    <span style={{ color: isFree ? "red" : "black" }}>
                        {info.renderValue()} CHF
                    </span>
                );
            },
            type: "number",
        },
        {
            accessor: "status",
            header: "Statut facture",
            cell: (row) => (
                <Badge variant={row.renderValue().key}>
                    {row.renderValue().name}
                </Badge>
            ),
            type: "multi",
            multi: statusAvailable(),
        },
        {
            accessor: "payment_type",
            header: "Encaissement",
            cell: (row) => (
                <Badge variant={row.renderValue().key}>
                    {row.renderValue().name}
                </Badge>
            ),
            type: "multi",
            multi: paymentTypesAvailable(),
        },
    ];

    const columns = builder.buildColumns(columnHeaders);

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
