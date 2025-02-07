//
import styles from "./styles/render_user_card.module.css"

//

//
import { NewRingBtn } from "./btns/NewRingBtn"
import { RenderRingCard } from "./RenderRingCardDashboard"
import { useTranslations } from "next-intl"

export const RenderUserCard = ({ userEmail, userName, ringsData }: any) => {
    const tI = useTranslations("Index")

    return (
        <div className={styles.user_container}>
            <div className={styles.header_rings_container}>
                <p> {tI("your_rings")} </p>
                <NewRingBtn userEmail={userEmail} />
            </div>
            <div className={styles.rings_container}>
                {ringsData?.length > 0 ? (<>
                    {ringsData.map((ring: any) => (
                        <RenderRingCard key={ring.id} ringData={ring} userEmail={userEmail} />
                    ))}</>
                ) : (
                    <p>{tI("empty_ring")}</p>
                )}
            </div>
        </div>
    )
}
