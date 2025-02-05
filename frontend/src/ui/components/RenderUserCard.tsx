//
import styles from "./styles/render_user_card.module.css"

//
import { RenderRingCard } from "./RenderRingCard"

export const RenderUserCard = ({userData}: any) => {
    return (
        <div className={styles.user_container}>
            <p>{userData.name}</p>
            <div className={styles.rings_container}>
                {userData.rings.map((ring: any) => (
                    <RenderRingCard key={ring.id} ringData={ring} />
                ))}
            </div>
        </div>
    )
}
