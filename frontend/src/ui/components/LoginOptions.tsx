import styles from "./styles/login_options.module.css"
import { Link } from "@/i18n/routing"
import { auth } from "@/auth"

export const LoginOptions = async () => {
    const session = await auth()

    return (
        <div className={styles.login_options_container}>
            {session ? (
                <Link href={"/dashboard"}>Dashboard</Link>
            ): (<>
                <Link href={"/login"}>Login</Link>
                <span>ou</span>
                <Link href={"/register"}>Cadastre-se</Link>
            </>)}
        </div>
    )
}
