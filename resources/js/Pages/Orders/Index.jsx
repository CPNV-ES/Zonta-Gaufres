import React, { use, useState } from "react";
import MainLayout from "../../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";
import { Badge } from "@/Components/ui/badge";
import Icon from "@/Components/Icon";
import Dialog from "@/Components/Dialog";
import {router} from "@inertiajs/react";
import { set } from "date-fns";

const Index = (base_orders) => {
    const [orders, setOrders] = useState(base_orders.orders);
    const builder = new ColumnBuilder();
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
        useState(false);
    const [currentDeleteOrder, setcurrentDeleteOrder] = useState(null);

    const statusAvailable = () => {
        let statuses = [];
        orders.forEach((order) => {
            if (!statuses.find((el) => el.key === order.status.key)) {
                statuses.push({
                    key: order.status.key,
                    name: order.status.name,
                });
            }
        });
        return statuses;
    };

    const handleDelete = (order) => {
        console.log(order);
        console.log(order.invoice_id);
        router.post(`/orders/${order.invoice_id}`, { _method: "DELETE" }, {
            onSuccess: () => {
                window.location.reload();
            }
        });
    };

    const paymentTypesAvailable = () => {
        let paymentTypes = [];
        orders.forEach((order) => {
            if (!paymentTypes.find((el) => el.key === order.payment_type.key)) {
                paymentTypes.push({
                    key: order.payment_type.key,
                    name: order.payment_type.name,
                });
            }
        });
        return paymentTypes;
    };

    const columnHeaders = [
        { accessor: "client", header: "Client", type: "string" },
        { accessor: "address", header: "Adresse", type: "string" },
        { accessor: "zip_code", header: "NPA", type: "number" },
        { accessor: "city", header: "Localité", type: "string" },
        { accessor: "note", header: "Remarque", type: "string" },
        { accessor: "gifted_by", header: "Offert par", type: "string" },
        { accessor: "delivery_guy", header: "Livreur", type: "string" },
        { accessor: "time_slot", header: "Plage horaire", type: "string" },
        { accessor: "contact", header: "Personne de Contact", type: "string" },
        {
            accessor: "waffles_number",
            header: "Nombre de gaufres",
            type: "number",
        },
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
        {
            accessor: "actions",
            header: "Actions",
            cell: (row) => (
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            setcurrentDeleteOrder(row.row.original);
                            console.log(row.row.original);

                            setIsDeleteConfirmationOpen(true);
                            console.log(currentDeleteOrder);

                        }}
                    >
                        <Icon name="trash" />
                    </button>
                    <button
                        onClick={() => {
                            window.location.href = `/orders/${row.row.original.invoice_id}/edit`;
                        }}
                    >
                        <Icon name="pencil" />
                    </button>
                </div>
            ),
        },
    ];

    const columns = builder.buildColumns(columnHeaders);

    return (
        <MainLayout color="green" subject="Commandes">
            <Dialog
                title="Êtes-vous sûr de vouloir annuler cette commande ?"
                buttonLabel="Supprimer"
                buttonVariant="red"
                action={() => {
                    setIsDeleteConfirmationOpen(false);
                    handleDelete(currentDeleteOrder);
                }}
                isOpen={isDeleteConfirmationOpen}
                setIsOpen={setIsDeleteConfirmationOpen}
            >
                <p className="text-sm text-gray-500">
                    Cette action est définitive. Une fois annulée, cette
                    commande ne pourra pas être récupérée. Si elle est associé à une facture, celle-ci sera également supprimé.
                </p>
            </Dialog>
            <DataTable
                columns={columns}
                inputData={orders}
                buttonsOptions={{
                    icon: "plus",
                    action: "Créer une commande",
                    variant: "green",
                    handler: (a) => (window.location.href = "/orders/create"),
                    alwaysOn: true,
                }}
            />
        </MainLayout>
    );
};

export default Index;
