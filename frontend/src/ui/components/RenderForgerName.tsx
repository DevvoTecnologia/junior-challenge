import { useTranslations } from "next-intl"

export const RenderForgerName = ({ forger }: { forger: string }) => {
    const tC = useTranslations("Configs")

    const forgersList: Record<string, Record<string, string>> = {
        sauron: { pt: "Sauron", en: "Sauron", es: "Sauron" },
        elfs: { pt: "Elfos", en: "Elfs", es: "Elfos" },
        dwarves: { pt: "Anões", en: "Dwarves", es: "Enanos" },
        humans: { pt: "Humanos", en: "Humans", es: "Humanos" }
    }

    const locale = tC("locale")
    const forgerName = forgersList[forger]?.[locale] || forgersList[forger]?.["pt"] || "Unknown"

    return <>{forgerName}</>
}
