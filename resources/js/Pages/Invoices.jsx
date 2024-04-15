import React from "react";
import MainLayout from "../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";

import { Checkbox } from "@/Components/ui/checkbox";

const builder = new ColumnBuilder();

const columnHeaders = [
    {
        name: "selected",
        cell: ({ row }) => (
            <div>
                <Checkbox checked={row.original.selected} />
            </div>
        ),
    },
    { name: "invoice_id" },
    { name: "company" },
    { name: "client" },
    { name: "creation_date" },
    { name: "payment_date" },
    { name: "status" },
    { name: "contact" },
    { name: "total" },
    {
        name: "actions",
        cell: ({ row }) => (
            <div>
                <button>View</button>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        ),
    },
];

const columns = builder.buildColumns(columnHeaders);

// ! TODO - Replace with actual data pulled from the database
const inputData = [
    {
        selected: false,
        invoice_id: 1,
        company: "Company 1",
        client: "Client 1",
        creation_date: "01/01/2021",
        payment_date: "01/01/2021",
        status: "Paid",
        contact: "Contact 1",
        total: "1000",
        actions: "Actions",
    },
    {
        selected: false,
        invoice_id: 2,
        company: "Company 2",
        client: "Client 2",
        creation_date: "01/01/2021",
        payment_date: "01/01/2021",
        status: "Paid",
        contact: "Contact 2",
        total: "1000",
        actions: "Actions",
    },
];

const MainPage = () => {
    return (
        <MainLayout color="red">
            <DataTable columns={columns} inputData={inputData} />
        </MainLayout>
    );
};

export default MainPage;
