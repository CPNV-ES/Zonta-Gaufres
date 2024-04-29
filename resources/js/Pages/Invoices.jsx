import React from "react";
import MainLayout from "../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";
import { Checkbox } from "@/Components/ui/checkbox";
import Icon from "@/Components/Icon";

const builder = new ColumnBuilder();

const columnHeaders = [
    {
        accessor: "select",
        header: ({ table }) => (
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
        cell: ({ row }) => (
            <Checkbox
                {...{
                    checked: row.getIsSelected(),
                    onCheckedChange: row.getToggleSelectedHandler(),
                }}
            />
        ),
    },
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
        cell: (
            <div className="flex gap-3">
                <button>
                    <Icon name="archive" />
                </button>
                <button>
                    <Icon name="download" />
                </button>

            </div>
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
    {
        invoice_id: 2,
        company: "Company 2",
        client: "Client 2",
        creation_date: "2021-01-01",
        payment_date: "2021-01-01",
        status: "Paid",
        contact: "John Doe",
        total: 100,
    },
    {
        invoice_id: 3,
        company: "Company 3",
        client: "Client 3",
        creation_date: "2021-01-01",
        payment_date: "2021-01-01",
        status: "Paid",
        contact: "John Doe",
        total: 100,
    },
];

const Invoices = () => {
    return (
        <MainLayout color="red" subject="Factures">
            <DataTable
                columns={columns}
                inputData={inputData}
                buttonsOptions={{
                    icon: "download",
                    action: "Télécharger",
                    item: "Facture",
                    variant: "red"
                }}
            />
        </MainLayout>
    );
};

export default Invoices;