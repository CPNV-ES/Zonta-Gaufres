import React from "react";
import Navbar from "@/Components/Navbar";
const MainLayout = ({ children, subject, color = "gray" }) => {
    return (
        <section id="main-layout" className={`bg-${color}-200`}>
            <Navbar color={color} subject={subject} />
            <section
                className={`main-layout-section border-${color}-400 relative overflow-auto w-full`}
            >
                {children}
            </section>
        </section>
    );
};

export default MainLayout;
