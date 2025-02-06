"use client"
import ReactDOM from "react-dom"
import styles from "./styles/modal_styles.module.css"
import { useState } from "react"
import { RiCloseLargeLine } from "react-icons/ri"
import { FormNewRing } from "../forms/FormNewRing"

export const ForjeModal = ({ onClose, userEmail }: { onClose: any, userEmail: any }) => {
    const [isExiting, setIsExiting] = useState(false)

    return ReactDOM.createPortal(
        <div
            className={`${styles.modal_overlay} ${isExiting ? styles.fade_out : ""}`}
            onClick={() => {
                setIsExiting(true)
                setTimeout(onClose, 300)
            }}
        >
            <div
                className={`${styles.modal_content} ${isExiting ? styles.slide_out : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.modal_close}>
                    <button onClick={() => {
                        setIsExiting(true)
                        setTimeout(onClose, 300)
                    }}>
                        <RiCloseLargeLine />
                    </button>
                    <p>Forja de Anéis</p>
                </div>
                <div className={styles.container_content}>
                    <FormNewRing userEmail={userEmail} />
                </div>
            </div>
        </div>,
        document.body
    )
}
