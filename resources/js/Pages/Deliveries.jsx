import React from "react";
import MainLayout from "../Layouts/MainLayout";
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
    },
    {
        accessor: "delivery_guy",
        header: "Livreur",
    },
    {
        accessor: "delivery_count",
        header: "Nb livraisons",
    },
    {
        accessor: "trip_count",
        header: "Nb trajets",
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

// ! TODO - Replace with actual data pulled from the database
const inputData = [
    {
        delivery_id: 1,
        delivery_guy: "Doe John",
        delivery_count: 5,
        trip_count: 3,
        address: "Fake Street 123",
        postal_code: 1234,
        locality: "Fake City",
        phone_number: "078 123 45 67",
    },
    {
        delivery_id: 2,
        delivery_guy: "Doe Jane",
        delivery_count: 3,
        trip_count: 2,
        address: "Fake Street 456",
        postal_code: 5678,
        locality: "Fake City",
        phone_number: "079 123 45 67",
    },
    {
        delivery_id: 3,
        delivery_guy: "Doe Jack",
        delivery_count: 2,
        trip_count: 1,
        address: "Fake Street 789",
        postal_code: 1357,
        locality: "Fake City",
        phone_number: "021 123 45 67",
    },
];

const Deliveries = () => {
    return (
        <MainLayout color="blue" subject="Livraisons">
            <DataTable
                columns={columns}
                inputData={inputData}
                buttonsOptions={[
                    {
                        id: "edit_delivery",
                        icon: "pencil",
                        action: "Modifier les livraisons",
                        variant: "blue",
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
