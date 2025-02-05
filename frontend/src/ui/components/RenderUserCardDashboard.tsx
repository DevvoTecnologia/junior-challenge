//
import styles from "./styles/render_user_card.module.css"

//
import { RenderRingCard } from "./RenderRingCard"
import { NewRingBtn } from "./btns/NewRingBtn"

export const RenderUserCard = ({ userData, nameSection }: any) => {
    return (
        <div className={styles.user_container}>
            <div className={styles.header_rings_container}>
                <p>Seus Anéis</p>
                <NewRingBtn />
            </div>
            <div className={styles.rings_container}>
                {userData?.rings?.length > 0 ? (<>
                    {userData.rings.map((ring: any) => (
                        <RenderRingCard key={ring.id} ringData={ring} />
                    ))}</>
                ) : (
                    <p>Nenhum anel cadastrado ainda</p>
                )}
            </div>
        </div>
    )
}
