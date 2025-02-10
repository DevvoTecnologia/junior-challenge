//
import styles from "./styles/login_page.module.css"

//
import { FormLogin } from "@/ui/components/forms/FormLogin"

export const LoginPage = () => {
    
    return (
        <div className={styles.login_page}>
            <FormLogin />
        </div>
    )
}
