import CreateOrderForm from "@/Components/CreateOrderForm.jsx";
import React from "react";
import MainLayout from "../../Layouts/MainLayout";

const Create = ({ contactPeopleNames, clientPeople }) => {
    return (
        <MainLayout color="green" subject="Commandes">
            <CreateOrderForm
                contactPeopleNames={contactPeopleNames}
                clientPeople={clientPeople}
            ></CreateOrderForm>
        </MainLayout>
    );
};
export default Create;
