import React from "react";
import MainLayout from "../../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

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
        type: "number",
    },
    {
        accessor: "delivery_guy",
        header: "Livreur",
        type: "string",
    },
    {
        accessor: "company",
        header: "Entreprise",
        type: "string",
    },
    {
        accessor: "buyer",
        header: "Personne livrée",
        type: "string",
    },
    {
        accessor: "address",
        header: "Adresse",
        type: "string",
    },
    {
        accessor: "postal_code",
        header: "NPA",
        type: "number",
    },
    {
        accessor: "locality",
        header: "Localité",
        type: "string",
    },
    {
        accessor: "phone_number",
        header: "Téléphone",
        type: "string",
    },
];

const columns = builder.buildColumns(columnHeaders);

const Deliveries = ({ initDeliveries }) => {

    const formatDeliveries = () => {
        let tmpdeliveries = []
        initDeliveries.map((d) => {
            const tmpdelivery = {
                'delivery_id': d.id,
                'delivery_guy': d.delivery_guy_schedule && d.delivery_guy_schedule.person
                ? `${d.delivery_guy_schedule.person.firstname} ${d.delivery_guy_schedule.person.lastname}`
                : "Aucun livreur",                'buyer': `${d.buyer.firstname} ${d.buyer.lastname}`,
                'company': d.buyer.company,
                'address': `${d.address.street} ${d.address.street_number}`,
                'postal_code': d.address.city.zip_code,
                'locality': d.address.city.name,
                'phone_number': d.buyer.phone_number
            }
            tmpdeliveries.push(tmpdelivery)
        })
        return tmpdeliveries
    }

    const handleLabelsPrint = (rowSelection) => {
        const selectedRows = Object.keys(rowSelection).filter(key => rowSelection[key]);
        if (selectedRows.length === 0) {
            return;
        }
        const selectedIds = selectedRows.map(row => initDeliveries[row].id);

        window.location.href = `/deliveries/print_labels?deliveries=${selectedIds.join(',')}`
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
                        handler: () => window.location.href = '/deliveries/edit',
                        alwaysOn: true
                    },
                    {
                        id: "print_labels",
                        icon: "printer",
                        action: "Imprimer",
                        item: "série d'étiquettes",
                        itemPlural: "séries d'étiquettes",
                        variant: "blue",
                        handler: handleLabelsPrint,
                        alwaysOn: false
                    },
                    {
                        id: "print_delivery_sheet",
                        icon: "printer",
                        action: "Imprimer des fiches de livraions",
                        variant: "blue",
                        alwaysOn: true
                    },
                ]}
            />
        </MainLayout>
    );
};

export default Deliveries;
