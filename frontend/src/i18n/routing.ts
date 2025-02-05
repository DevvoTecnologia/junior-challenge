//Imports
import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"
import { pathnames } from "@/i18n/pathnames"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["pt", "en", "es"],
  // Used when no locale matches
  defaultLocale: "pt",
  // Pathnames
  pathnames: pathnames
})

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
