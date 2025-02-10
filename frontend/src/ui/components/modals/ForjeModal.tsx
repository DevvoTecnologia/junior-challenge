"use client"
import ReactDOM from "react-dom"
import styles from "./styles/modal_styles.module.css"
import { useState } from "react"
import { RiCloseLargeLine } from "react-icons/ri"
import { useTranslations } from "next-intl"

export const ForjeModal = ({ onClose, children }: { onClose: any, children: React.ReactNode }) => {
    const [isExiting, setIsExiting] = useState(false)
    const tI = useTranslations("Index")

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
                    <p> {tI("rings_forge")} </p>
                </div>
                <div className={styles.container_content}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}
