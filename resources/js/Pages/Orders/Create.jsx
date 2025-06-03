import CreateOrderForm from "@/Components/CreateOrderForm.jsx";
import React from "react";
import MainLayout from "../../Layouts/MainLayout";

const Create = ({ contactPeopleNames, clientPeople, order = null   }) => {
    return (
        <MainLayout color="green" subject="Commandes">
            <CreateOrderForm
                contactPeopleNames={contactPeopleNames}
                clientPeople={clientPeople}
                order={order}
            ></CreateOrderForm>
        </MainLayout>
    );
};
export default Create;
