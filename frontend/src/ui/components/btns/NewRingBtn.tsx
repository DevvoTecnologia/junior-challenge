"use client"

import { useState } from "react"
import { ForjeModal } from "../modals/ForjeModal"
import { useTranslations } from "next-intl"
import { FormNewRing } from "@/ui/components/forms/FormNewRing"

export const NewRingBtn = ({userEmail}: any) => {
    const tI = useTranslations("Index")
    const [ isModalOpen, setIsModalOpen ] =useState<boolean>(false)

    function changeStateForje() {
        setIsModalOpen(!isModalOpen)
    }

    return (<>
        <button onClick={changeStateForje}> {tI("forge_new_ring")} </button>
        {isModalOpen && <ForjeModal onClose={changeStateForje}> <FormNewRing userEmail={userEmail} /> </ForjeModal>}
    </>)
}
