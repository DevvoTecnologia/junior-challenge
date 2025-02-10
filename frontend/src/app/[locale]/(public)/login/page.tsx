import { LoginPage } from "@/ui/pages/LoginPage"
import { auth } from "@/auth"
import { redirect } from "@/i18n/routing"
import { cookies } from "next/headers"

export default async function page() {
    const [ session, cookieStore ] = await Promise.all([ auth(), cookies() ])
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "pt"

    if (session) {
        return redirect({ href: "/dashboard", locale: locale } as any)
    }

    return <LoginPage />
}
