import React from 'react'
import { DialogTrigger as DT } from "@radix-ui/react-dialog";
import { Button } from "@/Components/ui/button"


const DialogTrigger = ({title}) => {
    return (
        <DT asChild>
            <Button variant="outline">{title}</Button>
        </DT>
    )
}

export default DialogTrigger