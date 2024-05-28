import React from "react";
import MainLayout from "../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import {ColumnBuilder} from "@/Builder/ColumnBuilder";
import {Checkbox} from "@/Components/ui/checkbox";

const builder = new ColumnBuilder();

const columnHeaders = [
    {
        accessor: "select",
        header: ({table}) => (
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
        cell: ({row}) => (
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

const Deliveries = ({deliveries}) => {
    return (
        <MainLayout color="blue" subject="Livraisons">
            <DataTable
                columns={columns}
                inputData={deliveries}
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
