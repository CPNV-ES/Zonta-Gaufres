import React from 'react'
import MainLayout from '../Layouts/MainLayout'
import DeliveryguysCard from "@/Components/DeliveryguysCard.jsx";
import DeliveryguysBigCard from "@/Components/DeliveryguysBigCard.jsx";

const Example = () => {
  const subject = "Commandes"
  const color = "green"

  return (
      <MainLayout color={color} subject={subject}>
        <DeliveryguysCard name={"Pierre-kiroul"} surname={"namassepasmousse"} city={"Lausanne"} orders={23} trips={3} />
        <DeliveryguysCard name={"Paul"} surname={"Dupont"} city={"Yvonand"} orders={54} trips={5} />
        <DeliveryguysCard name={"Paul"} city={"Yverdon"} orders={32} trips={7} />
        <DeliveryguysCard name={"Paul"} city={"Les cluuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuds"} orders={2} trips={15} timetable={[{available: true},{available: false},{available: true},{available: false},{available: false},{available: true},{available: true},{available: false},{available: true},{available: false},{available: true},{available: true}]} />
        <DeliveryguysCard name={"Paul"} city={"Les cluds"} orders={2} trips={15} timetable={[{available: true},{available: false},{available: true},{available: false},{available: false},{available: true},{available: true},{available: false},{available: true},{available: false},{available: true},{available: true}]} />
        <DeliveryguysBigCard name={"BigPaul"} surname={"Dupont"} city={"Yverdon-les-bainnnnnnnnnnnnnns"} street={"Priales"} streetNumber={"19"} postalCode={"1462"} phone={"079 796 65 34"} orders={54} trips={5} timetable={[{available: true},{available: false},{available: true},{available: false},{available: false},{available: true},{available: true},{available: false},{available: true},{available: false},{available: true},{available: true}]}/>
    </MainLayout>
  )
}

export default Example
