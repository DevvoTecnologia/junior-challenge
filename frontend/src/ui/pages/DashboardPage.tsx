//
import styles from "./styles/dashboard_page.module.css"
//
import { SignOutBtn } from "@/ui/components/btns/SignOutBtn"
import { RenderUserCard } from "../components/RenderUserCardDashboard"

//
import { useTranslations } from "next-intl"

export const DashBoardPage = ({userEmail, userName, ringsData}: any) => {
    const tI = useTranslations("Index")

    return (
        <div className={styles.dashboard_container}>
            <div className={styles.header_dashboard}>
                <p>{tI("Hi")}, {userName}, {tI("your_forge")}</p>
                <SignOutBtn />
            </div>      
            <RenderUserCard userName={userName} userEmail={userEmail} ringsData={ringsData} />
        </div>
    )
}
