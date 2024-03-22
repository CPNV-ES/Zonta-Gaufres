import React from 'react'
import MainLayout from '../Layouts/MainLayout'

const Example = () => {
  const subject = "Commandes"
  const color = "green"

  return (
    <MainLayout color={color} subject={subject}>
    </MainLayout>
  )
}

export default Example