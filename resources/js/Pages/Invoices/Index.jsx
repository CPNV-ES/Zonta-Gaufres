import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";
import { Checkbox } from "@/Components/ui/checkbox";
import Icon from "@/Components/Icon";
import { Badge } from "@/Components/ui/badge";
import Dialog from "@/Components/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/Components/ui/select";
import { Input } from "@/Components/ui/input";
import { router } from "@inertiajs/react";

const Index = (invoices) => {
    const builder = new ColumnBuilder();
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [currentIncoiceId, setCurrentInvoiceId] = React.useState(null);

    invoices = invoices.invoices;

    const statusAvailable = () => {
        let statuses = [];

        invoices.forEach(invoice => {
            if (!statuses.find((el) => el.key === invoice.status.key)) {
                statuses.push({ key: invoice.status.key, name: invoice.status.name });
            }
        });
        return statuses;
    };

    const OPTIONS = [
        { label: "Payée", value: "PAID" },
        { label: "Ouverte", value: "OPEN" },
        { label: "Annulée", value: "CANCELLED" },
        { label: "En cours", value: "INPROGRESS" },
    ];

    const [input, setInput] = React.useState({
        status: OPTIONS[0].value,
        payment_date: null,
    });
    
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
            cell: (row) => (
                <div className="flex gap-3">
                    <button onClick={() => handleEdit(row.row.original)}>
                        <Icon name="pencil" />
                    </button>
                </div>
            ),
        },
    ];

    const handleEdit = (invoice) => {
        console.log(invoice);
        setInput({
            status: invoice.status.key,
            payment_date: invoice.payment_date,
        });
        setCurrentInvoiceId(invoice.id);
        console.log(input);
        setIsDialogOpen(true);
    };

    const handleSubmit = () => {
        console.log(input);
        router.put(`/invoices/${currentIncoiceId}`, input);
        setIsDialogOpen(false);
        window.location.reload();
    }
    
    const columns = builder.buildColumns(columnHeaders);

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
            <Dialog
                title={
                    "Modifier"
                }
                description=""
                buttonLabel="Mettre à jour"
                action={handleSubmit}
                isOpen={isDialogOpen}
                setIsOpen={setIsDialogOpen}
            >
                <Select defaultValue={input.status} onValueChange={(e) => setInput((prev) => ({ ...prev, status: e }))}>
                    <SelectTrigger>
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        {OPTIONS.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                                {status.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Input type="date" defaultValue={input.payment_date} onChange={(e) => setInput((prev) => ({ ...prev, payment_date: e.target.value }))} />
            </Dialog>
        </MainLayout>
    );
};

export default Index;
