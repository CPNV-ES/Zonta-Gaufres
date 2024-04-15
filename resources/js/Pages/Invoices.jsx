import React from "react";
import MainLayout from "../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";

const builder = new ColumnBuilder();

const columnHeaders = [
    { accessor: "invoice_id", header: "#" },
    { accessor: "company", header: "Entreprise" },
    { accessor: "client", header: "Client" },
    { accessor: "creation_date", header: "Date de création" },
    { accessor: "payment_date", header: "Date de paiment" },
    { accessor: "status" },
    { accessor: "contact" },
    { accessor: "total" },
    {
        accessor: "actions",
        cell: (info) => (
            <a href={`/invoices/${info.row.original.invoice_id}`}>Delete</a>
        ),
    },
];

const columns = builder.buildColumns(columnHeaders);

// ! TODO - Replace with actual data pulled from the database
const inputData = [
    {
        invoice_id: 1,
        company: "Company 1",
        client: "Client 1",
        creation_date: "2021-01-01",
        payment_date: "2021-01-01",
        status: "Paid",
        contact: "John Doe",
        total: 100,
    },
];

const MainPage = () => {
    return (
        <MainLayout color="green" subject="Commandes">
            <DataTable columns={columns} inputData={inputData} />
        </MainLayout>
    );
};

export default MainPage;
