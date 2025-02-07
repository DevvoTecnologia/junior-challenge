//
import styles from "./styles/render_ring.module.css"

//
import { useTranslations } from "next-intl"

//
import { RenderForgerName } from "./RenderForgerName"

export const RenderRingCard = ({ringData}: any) => {
    const t = useTranslations("Index")

    return (
        <div className={styles.ring_container} style={{ backgroundImage: `url(${ringData.image})` }}>
            <div>
                <p className={styles.name_ring}> <strong>{ringData.name}</strong></p>
                <div>
                    <p> {ringData.power} </p>
                    <div>
                        <p> {t("forger")}: <strong><RenderForgerName forger={ringData.forjer} /></strong> </p>
                        <p> {t("carrie")}: <strong>{ringData.carrier}</strong> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
