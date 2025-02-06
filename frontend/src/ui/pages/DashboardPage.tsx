//
import styles from "./styles/dashboard_page.module.css"

//
import { headers } from "next/headers"

//
import { SignOutBtn } from "@/ui/components/btns/SignOutBtn"

//
import { RenderUserCard } from "../components/RenderUserCardDashboard"

async function getServerSideData(userEmail: string | null | undefined) {
    const headerList = await headers()
    const host = headerList.get("host")

    if (!userEmail) {
        return "aaaaaaaaaaaaaaa"
    }

    try {
        const res = await fetch(`http://${host}/api/get-user-ring/${userEmail}`, {
            method: "GET",
            cache: "no-cache"
        })

        if (!res.ok) {
            return null
        }

        const data = await res.json()
        return data

    } catch (error) {
        console.error("Error fetching server-side data:", error)
        return null
    }
}

export const DashBoardPage = async ({userEmail, userName}: any) => {
    const ringsData = await getServerSideData(userEmail)

    return (
        <div className={styles.dashboard_container}>
            <div className={styles.header_dashboard}>
                <p>Olá, {userName}, essa é sua Dashboard de Forja de Anéis</p>
                <SignOutBtn />
            </div>      
            <RenderUserCard userEmail={userEmail} ringsData={ringsData.rings} />
        </div>
    )
}
