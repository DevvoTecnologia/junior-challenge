//
import styles from "./styles/login_page.module.css"

//
import { FormRegister } from "../components/forms/FormRegister"

export const RegisterPage = async () => {

    return (
        <div className={styles.login_page}>
            <FormRegister />
        </div>
    )
}
