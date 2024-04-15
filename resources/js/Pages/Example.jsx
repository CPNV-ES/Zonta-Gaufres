import React from 'react'
import MainLayout from '../Layouts/MainLayout'
import DeliveryguysCard from "@/Components/DeliveryguysCard.jsx";

const Example = () => {
  return (
    <MainLayout color='green'>
        <DeliveryguysCard name={"Pierre-kiroul"} surname={"namassepasmousse"} city={"Lausanne"} orders={23} trips={3} />
        <DeliveryguysCard name={"Paul"} surname={"Dupont"} city={"Yvonand"} orders={54} trips={5} />
        <DeliveryguysCard name={"Paul"} city={"Yverdon"} orders={32} trips={7} />
        <DeliveryguysCard name={"Paul"} city={"Les cluuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuds"} orders={2} trips={15} timetable={[{available: true},{available: false},{available: true},{available: false},{available: false},{available: true},{available: true},{available: false},{available: true},{available: false},{available: true},{available: true}]} />
        <DeliveryguysCard name={"Paul"} city={"Les cluds"} orders={2} trips={15} timetable={[{available: true},{available: false},{available: true},{available: false},{available: false},{available: true},{available: true},{available: false},{available: true},{available: false},{available: true},{available: true}]} />

    </MainLayout>
  )
}

export default Example
