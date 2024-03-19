import React from 'react'
import MainLayout from '../Layouts/MainLayout'

const Example = () => {
  const subject = "Commandes"

  return (
    <MainLayout color='green' subject={subject}>
    </MainLayout>
  )
}

export default Example