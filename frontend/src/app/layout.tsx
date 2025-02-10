//
import "../globals.css"

//
import { cookies } from "next/headers"

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "pt" 
  
  function defineLang() {
    if (locale === "pt") {
      return "pt-br"
    }

    if (locale === "en") {
      return "en"
    }

    if (locale === "es") {
      return "es"
    }

    return "pt"
  }

  return (
    <html lang={ defineLang() }>
      <body data-theme={"t-light"}>{children}</body>
    </html>
  )
}
