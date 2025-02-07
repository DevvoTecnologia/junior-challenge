"use client"

//
import styles from "./styles/form.module.css"

//
import { useState } from "react"
import { Link } from "@/i18n/routing"
import { useRouter } from "@/i18n/routing"
import { useTranslations } from "next-intl"

//

export const FormRegister = () => {
    const router = useRouter()
    const t = useTranslations("Index")
    const tC = useTranslations("Configs")
    const tE = useTranslations("ErrorMessages")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [submitStatus, setSubmitStatus] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSubmitStatus(true)
        setErrorMessage("")
    
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
    
            if (!res.ok) {
                setErrorMessage( tE("email_already") )
                return
            }
    
            router.push({
                pathname: "/login",
                query: { register: "success" }
            })
    
        } catch (error) {
            console.error(error)
            setErrorMessage( tE("internal_error") )
        } finally {
            setSubmitStatus(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <p> {t("do_register")} </p>
            <label>
                <span> {t("name")} </span>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                <span> Email </span>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </label>
            <label>
                <span> {t("password")} </span>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
            </label>
            {errorMessage && (
                <p className={styles.error_message}> {errorMessage} </p>
            )}
            <button type="submit" disabled={submitStatus}>
                { submitStatus ? t("registering") : t("do_register_2") }
            </button>
            <Link href={"/login"}> {t("register_login")} </Link>
        </form>
    )
}
