"use client"
//
import styles from "./styles/form.module.css"

//
import { useSearchParams } from "next/navigation"
import { useActionState, useEffect } from "react"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { loginAction } from "@/lib/actions/loginAction"
import Form from "next/form"
import { useRouter } from "@/i18n/routing"

//

export const FormLogin = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const registerState = searchParams.get("register")
    const t = useTranslations("Index")
    const [state, formAction, isPending] = useActionState(loginAction, null)

    useEffect(() => {
        if (state?.success) {
            router.push("/dashboard" as any)
        }
    }, [state])

    return (
        <Form action={formAction} className={styles.form}>
            {registerState === "success" && (
                <p className={styles.success_msg} aria-live="polite">
                    {t("register_done")}
                </p>
            )}
            <p> {t("do_login")} </p>
            <label>
                <span> Email </span>
                <input
                    type="email"
                    name="email"
                    required
                />
            </label>
            <label>
                <span> {t("password")} </span>
                <input
                    type="password"
                    name="password"
                    required
                />
            </label>
            {state?.success === false && (
                <p className={styles.error_message} aria-live="assertive">
                    {state?.message}
                </p>
            )}
            <button type="submit" disabled={isPending}>
                {isPending ? t("loging") : t("do_login_2")}
            </button>
            <Link href="/register"> {t("no_login_register")} </Link>
        </Form>
    )
}
