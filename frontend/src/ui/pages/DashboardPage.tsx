//
import styles from "./styles/dashboard_page.module.css"

//
import { auth } from "@/auth"
import { redirect } from "@/i18n/routing"

//
import { SignOutBtn } from "@/ui/components/btns/SignOutBtn"
import { cookies } from "next/headers"

//
import { RenderUserCard } from "../components/RenderUserCardDashboard"

export const DashBoardPage = async () => {
    const [session, cookieStore] = await Promise.all([auth(), cookies()])
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "pt"

    if (!session) {
        return redirect({ href: "/login", locale: locale } as any)
    }

    return (
        <div className={styles.dashboard_container}>
            <div className={styles.header_dashboard}>
                <p>Olá, {session?.user?.name}, essa é sua Dashboard de Forja de Anéis</p>
                <SignOutBtn />
            </div>      
            <RenderUserCard ringsData={session.user} />
        </div>
    )
}
