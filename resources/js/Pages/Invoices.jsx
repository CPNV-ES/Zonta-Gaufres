import React from "react";
import MainLayout from "../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";

const builder = new ColumnBuilder();

const columnHeaders = [
    "selected",
    "invoice_id",
    "company",
    "client",
    "creation_date",
    "payment_date",
    "status",
    "contact",
    "total",
    "actions",
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
    }
];

const MainPage = () => {
    return (
        <MainLayout color="red">
            <DataTable columns={columns} inputData={inputData} />
        </MainLayout>
    );
};

export default MainPage;
