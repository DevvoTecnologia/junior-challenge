//
import styles from "./styles/render_ring.module.css"
//
import Image from "next/image"
import { useTranslations } from "next-intl"

//
import { RenderForgerName } from "./RenderForgerName"
import { DestroyRingBtn } from "./btns/DestroyRingBtn"

export const RenderRingCard = ({ringData, userEmail}: any) => {
    const t = useTranslations("Index")

    return (
        <div className={styles.ring_container}>
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
            <div className={styles.btns_container}>
               <DestroyRingBtn userEmail={userEmail} ring_id={ringData.id} />
            </div>
            <Image 
                src={ringData.image}
                height={430}
                width={300}
                alt={ringData.name} 
            />
        </div>
    )
}
