//
import { auth } from "@/auth"
import { redirect } from "@/i18n/routing"
import { cookies } from "next/headers"
import { headers } from "next/headers"

//
import { DashBoardPage } from "@/ui/pages/DashboardPage"

async function getServerSideData(userEmail: string | null | undefined) {
    const headerList = await headers()
    const host = headerList.get("host")

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

    } catch (error: any) {
        console.error( error.status )
        return null
    }
}

export default async function page() {
    const [ session, cookieStore ] = await Promise.all([auth(), cookies()])
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "pt"

    if (!session) {
        return redirect({ href: "/login", locale: locale } as any)
    }

    const ringsData = await getServerSideData(session?.user?.email)
    
    return <DashBoardPage userEmail={session?.user?.email} userName={session?.user?.name} ringsData={ringsData.rings} />
}
