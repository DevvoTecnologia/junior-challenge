"use client"

import { useState } from "react"
import { ForjeModal } from "../modals/ForjeModal"

export const NewRingBtn = ({userEmail}: any) => {
    const [ isModalOpen, setIsModalOpen ] =useState<boolean>(false)

    function changeStateForje() {
        setIsModalOpen(!isModalOpen)
    }

    return (<>
        <button onClick={changeStateForje}> Forjar Novo Anel </button>
        {isModalOpen && <ForjeModal userEmail={userEmail} onClose={changeStateForje} />}
    </>)
}
