import CreateOrderForm from "@/Components/CreateOrderForm.jsx";
import React from "react";
import MainLayout from "../../Layouts/MainLayout";

const Create = (contactPeopleNames) => {
    contactPeopleNames = contactPeopleNames.contactPeopleNames;
    return (
        <MainLayout color="green" subject="Commandes">
            <CreateOrderForm contactPeopleNames={contactPeopleNames}></CreateOrderForm>
        </MainLayout>

    )
}
export default Create;
