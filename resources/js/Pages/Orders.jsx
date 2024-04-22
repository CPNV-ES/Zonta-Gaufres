import React from "react";
import MainLayout from "../Layouts/MainLayout";
import DataTable from "@/Components/DataTable";

import { ColumnBuilder } from "@/Builder/ColumnBuilder";

const builder = new ColumnBuilder();

const columnHeaders = [
    { accessor: "invoice_id", header: "#" },
    { accessor: "company", header: "Entreprise"},
    { accessor: "client", header: "Client"},
    { accessor: "address", header: "Adresse"},
    { accessor: "zip_code", header: "NPA"},
    { accessor: "city", header: "Localité"},
    { accessor: "note", header: "Remarque"},
    { accessor: "offered_by", header: "Offert par"},
    { accessor: "delivery", header: "Livreur"},
    { accessor: "time_slot", header: "Plage horaire"},
    { accessor: "contact", header: "Contact année passée"},
    { accessor: "waffles_number", header: "Nombre de gaufres"},
    { accessor: "total", header: "Total", cell: (info) => `${info.renderValue()} CHF`},
    { accessor: "status", header: "Statut facture"},
    { accessor: "payment_type", header: "Encaissement"},
];

const columns = builder.buildColumns(columnHeaders);

// ! TODO - Replace with actual data pulled from the database
const inputData = [
    {
        invoice_id: 1,
        company: "Gaufres SA",
        client: "John Doe",
        address: "Rue de la Gare",
        zip_code: 1234,
        city: "Lausanne",
        note: "Livrer à l'arrière",
        offered_by: "Jules",
        delivery: "Jean",
        time_slot: "14:00-16:00",
        contact: "Salomé",
        waffles_number: 10,
        total: 100.0,
        status: "Payée",
        payment_type: "Livraison",
    },
    {
        invoice_id: 2,
        company: "Gaufres SA",
        client: "Jane Doe",
        address: "Rue du Château",
        zip_code: 1234,
        city: "Lausanne",
        note: "Livrer à l'arrière",
        offered_by: "Jules",
        delivery: "Jean",
        time_slot: "14:00-16:00",
        contact: "Salomé",
        waffles_number: 10,
        total: 100.0,
        status: "Payée",
        payment_type: "Livraison",
    },
    {
        invoice_id: 3,
        company: "Gaufres SA",
        client: "Jack Doe",
        address: "Rue du Lac",
        zip_code: 1234,
        city: "Lausanne",
        note: "Livrer à l'arrière",
        offered_by: "Jules",
        delivery: "Jean",
        time_slot: "14:00-16:00",
        contact: "Salomé",
        waffles_number: 10,
        total: 100.0,
        status: "Payée",
        payment_type: "Livraison",
    },
];

const MainPage = () => {
    return (
        <MainLayout color="green" subject="Commandes">
            <DataTable columns={columns} inputData={inputData} buttonOptions={
                {
                    icon: "plus",
                    action: "Créer une commande",
                    variant: "green"
                }
            }/>
        </MainLayout>
    );
};

export default MainPage;
