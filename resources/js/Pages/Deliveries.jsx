import React from "react";
import MainLayout from "../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import { router } from '@inertiajs/react'

import { ColumnBuilder } from "@/Builder/ColumnBuilder";
import { Checkbox } from "@/Components/ui/checkbox";

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
    {
        accessor: "delivery_id",
        header: "#",
    },
    {
        accessor: "delivery_guy",
        header: "Livreur",
    },
    {
        accessor: "company",
        header: "Entreprise",
    },
    {
        accessor: "buyer",
        header: "Personne livrée",
    },
    {
        accessor: "address",
        header: "Adresse",
    },
    {
        accessor: "postal_code",
        header: "NPA",
    },
    {
        accessor: "locality",
        header: "Localité",
    },
    {
        accessor: "phone_number",
        header: "Téléphone",
    },
];

const columns = builder.buildColumns(columnHeaders);

const Deliveries = ({ initDeliveries }) => {

    const formatDeliveries = () => {
        let tmpdeliveries = []
        initDeliveries.map((d) => {
            const tmpdelivery = {
                'delivery_id': d.id,
                'delivery_guy': `${d.delivery_guy_schedule.person.firstname} ${d.delivery_guy_schedule.person.lastname}`,
                'buyer': `${d.buyer.firstname} ${d.buyer.lastname}`,
                'company': d.buyer.company,
                'address': `${d.address[0].street} ${d.address[0].street_number}`,
                'postal_code': d.address[0].city.zip_code,
                'locality': d.address[0].city.name,
                'phone_number': d.buyer.phone_number
            }
            tmpdeliveries.push(tmpdelivery)
        })
        return tmpdeliveries
    }

    return (
        <MainLayout color="blue" subject="Livraisons">
            <DataTable
                columns={columns}
                inputData={formatDeliveries()}
                buttonsOptions={[
                    {
                        id: "edit_delivery",
                        icon: "pencil",
                        action: "Modifier les livraisons",
                        variant: "blue",
                        handler: () => window.location.href = '/deliveries/edit'
                    },
                    {
                        id: "print_labels",
                        icon: "printer",
                        action: "Imprimer",
                        item: "série d'étiquettes",
                        itemPlural: "séries d'étiquettes",
                        variant: "blue",
                    },
                    {
                        id: "print_delivery_sheet",
                        icon: "printer",
                        action: "Imprimer des fiches de livraions",
                        variant: "blue",
                    },
                ]}
            />
        </MainLayout>
    );
};

export default Deliveries;
