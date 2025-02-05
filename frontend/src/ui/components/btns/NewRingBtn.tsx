"use client"

import { useState } from "react"
import { ForjeModal } from "../modals/ForjeModal"

export const NewRingBtn = () => {
    const [ isModalOpen, setIsModalOpen ] =useState<boolean>(false)

    function changeStateForje() {
        setIsModalOpen(!isModalOpen)
    }

    return (<>
        <button onClick={changeStateForje}> Forjar novo anél </button>
        {isModalOpen && <ForjeModal onClose={changeStateForje} />}
    </>)
}
