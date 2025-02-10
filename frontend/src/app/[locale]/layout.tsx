//
import "../../globals.css"

//
import { ReactNode } from "react"
import { NextIntlClientProvider } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { getMessages } from "next-intl/server"
import { cookies } from "next/headers"

//
import { routing } from "../../i18n/routing"

//
import { HomeLink } from "@/ui/components/btns/HomeLink"

//
import type { Metadata } from "next"

type LayoutTypes = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

//

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "pt"

  // Definindo o tipo de títulos com uma chave de idiomas e valores de string
  const titles: Record<"pt" | "en" | "es", string> = {
    pt: "Devvo Desafio Junior - Anéis de Poder",
    en: "Junior Challenge Devvo - Rings of Power",
    es: "Desafío Junior Devvo - Anillos de Poder"
  }

  // Tipando o retorno para garantir que title seja uma string
  // Garantindo que locale seja uma chave válida
  return {
    title: titles[locale as "pt" | "en" | "es"],
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LayoutTypes) {
  setRequestLocale((await params).locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <HomeLink />
      {children}
    </NextIntlClientProvider>
  )
}
