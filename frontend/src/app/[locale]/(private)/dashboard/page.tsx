//
import { auth } from "@/auth"
import { redirect } from "@/i18n/routing"
import { cookies } from "next/headers"

//
import { DashBoardPage } from "@/ui/pages/DashboardPage"

export default async function page() {
    const [session, cookieStore] = await Promise.all([auth(), cookies()])
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "pt"

    if (!session) {
        return redirect({ href: "/login", locale: locale } as any)
    }
    
    return <DashBoardPage userEmail={session?.user?.email} userName={session?.user?.name} />
}
