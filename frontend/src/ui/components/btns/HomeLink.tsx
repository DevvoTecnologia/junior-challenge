//
import styles from "./styles/home_link.module.css"
import { IoHomeOutline } from "react-icons/io5"
import { IoIosArrowBack } from "react-icons/io"

//
import { Link } from "@/i18n/routing"

//
import { ChangeThemeElement } from "../ChangeThemeElement"

export const HomeLink = () => {
    return (
        <div className={styles.home_link_container}>
            <Link href={"/"}>
                <IoIosArrowBack />
                <IoHomeOutline />
            </Link>
            <ChangeThemeElement />
        </div>
    )
}
