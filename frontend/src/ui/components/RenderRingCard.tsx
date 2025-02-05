//
import styles from "./styles/render_ring.module.css"

//
import Image from "next/image"
import { useTranslations } from "next-intl"

//
import { RenderForgerName } from "./RenderForgerName"

export const RenderRingCard = ({ringData}: any) => {
    const t = useTranslations("Index")

    return (
        <div className={styles.ring_container}>
            <p> <strong>{ringData.name}</strong> </p>
            <Image 
                src={ringData.image}
                height={250}
                width={260}
                alt={ringData.name} 
            />
            <p> {ringData.power} </p>
            <p> {t("forger")}: <strong><RenderForgerName forger={ringData.forjer} /></strong> </p>
            <p> {t("carrie")}: <strong>{ringData.carrier}</strong> </p>
        </div>
    )
}
