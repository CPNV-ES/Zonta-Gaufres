import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";
import { Checkbox } from "@/Components/ui/checkbox";
import Icon from "@/Components/Icon";
import { Badge } from "@/Components/ui/badge";

const Index = (invoices) => {
    const builder = new ColumnBuilder();

    const statusAvailable = () => {
        let statuses = [];
        invoices.invoices.forEach(invoice => {
            if (!statuses.find((el) => el.key === invoice.status.key)) {
                statuses.push({ key: invoice.status.key, name: invoice.status.name });
            }
        });
        return statuses;
    };
    
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
        { accessor: "invoice_id", header: "#", type: "number" },
        { accessor: "company", header: "Entreprise", type: "string" },
        { accessor: "client", header: "Client", type: "string" },
        { accessor: "creation_date", header: "Date de création", type: "date" },
        { accessor: "payment_date", header: "Date de paiment", type: "date" },
        { accessor: "status", header: "Statut", cell: (row) => (
            <Badge variant={row.renderValue().key}>
                {row.renderValue().name}
            </Badge>
        ), type: "multi", multi: statusAvailable() },
        { accessor: "contact", header: "Contact", type: "string" },
        { accessor: "total", header: "Total", type: "number" },
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

    console.log('Invoices data:', invoices);

    invoices = invoices.invoices;
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
                }}
            />
        </MainLayout>
    );
};

export default Index;
