import React from "react";
import MainLayout from "../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";

const builder = new ColumnBuilder();

const columnHeaders = [
    {
        accessor: "lastname",
        header: "Nom",
    },
    {
        accessor: "firstname",
        header: "Prénom",
    },
    {
        accessor: "role",
        header: "Rôle",
    },
    {
        accessor: "phone",
        header: "Téléphone",
    },
    {
        accessor: "address",
        header: "Adresse",
    },
    {
        accessor: "email",
        header: "Email",
    },
    {
        accessor: "orders_count",
        header: "Nb commandes",
    },
    {
        accessor: "note",
        header: "Remarque",
    }
];

const columns = builder.buildColumns(columnHeaders);

// ! TODO - Replace with actual data pulled from the database
const inputData = [
    {
        lastname: "Doe",
        firstname: "John",
        role: "Manager",
        phone: "0123456789",
        address: "123, Fake Street",
        email: "j.doe@gmail.com",
        orders_count: 5,
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        lastname: "Doe",
        firstname: "Jane",
        role: "Employee",
        phone: "0123456789",
        address: "123, Fake Street",
        email: "ja.doe@gmail.com",
        orders_count: 3,
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        lastname: "Doe",
        firstname: "Jack",
        role: "Employee",
        phone: "0123456789",
        address: "123, Fake Street",
        email: "jk.doe@gmail.com",
        orders_count: 2,
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
        lastname: "Doe",
        firstname: "Jill",
        role: "Employee",
        phone: "0123456789",
        address: "123, Fake Street",
        email: "ji.doe@gmail.com",
        orders_count: 1,
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
];

const People = () => {
    return (
        <MainLayout color="yellow" subject="Personnel">
            <DataTable
                columns={columns}
                inputData={inputData}
                buttonsOptions={{
                    icon: "plus",
                    action: "Ajouter une personne",
                    variant: "yellow",
                }}
            />
        </MainLayout>
    );
};

export default People;
