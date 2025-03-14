import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";
import { Checkbox } from "@/Components/ui/checkbox";
import Icon from "@/Components/Icon";
import { RowSelection } from "@tanstack/react-table";

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

];

const columns = builder.buildColumns(columnHeaders);

const Index = (invoices) => {
    invoices = invoices.invoices;

    const handleInvoicesPrint = (rowSelection) => {
        const selectedRows = Object.keys(rowSelection).filter(key=> rowSelection[key]);
        console.log(selectedRows + " e");
        if(selectedRows.length === 0) {
            return;
        }
        const selectedIds= selectedRows.map(row => invoices[row].invoice_id);
        console.log(selectedIds + " f");


        window.location.href = `/invoices/print_invoices?invoices=${selectedIds.join(",")}`;
    };
//TODO: link produce : invoices/print_invoices?invoices=* (* -> nothing in), correct it + route to make

    return (
        <MainLayout color="red" subject="Factures">
            <DataTable
                columns={columns}
                inputData={invoices}
                buttonsOptions={{
                    icon: "download",
                    action: "Télécharger",
                    item: "Facture",
                    variant: "red",
                    handler: handleInvoicesPrint,
                    alwaysOn: false,
                }}
            />
        </MainLayout>
    );
};

export default Index;
