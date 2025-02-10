"use client"

import { TiPencil } from "react-icons/ti"

import { useState } from "react"

import { ForjeModal } from "@/ui/components/modals/ForjeModal"
import { FormEditRing } from "@/ui/components/forms/FormEditRing"

export const EditRingBtn = ({userEmail, ringData}: {userEmail: string, ringData: any}) => {
    const [ isModalOpen, setIsModalOpen ] =useState<boolean>(false)

    function changeStateForje() {
        setIsModalOpen(!isModalOpen)
    }

    return (<>
        <button onClick={changeStateForje}> <TiPencil /> </button>
        {isModalOpen && <ForjeModal onClose={changeStateForje}> <FormEditRing userEmail={userEmail} ringData={ringData} /> </ForjeModal>}
    </>)
}
