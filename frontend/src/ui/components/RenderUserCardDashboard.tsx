//
import styles from "./styles/render_user_card.module.css"

//
import { auth } from "@/auth"

//
import { NewRingBtn } from "./btns/NewRingBtn"
import { RenderRingCard } from "./RenderRingCardDashboard"

export const RenderUserCard = async ({ ringsData, userEmail }: any) => {
    const session = await auth()

    return (
        <div className={styles.user_container}>
            <div className={styles.header_rings_container}>
                <p>Seus Anéis</p>
                <NewRingBtn userEmail={session?.user?.email} />
            </div>
            <div className={styles.rings_container}>
                {ringsData?.length > 0 ? (<>
                    {ringsData.map((ring: any) => (
                        <RenderRingCard key={ring.id} ringData={ring} userEmail={userEmail} />
                    ))}</>
                ) : (
                    <p>Nenhum anel cadastrado ainda</p>
                )}
            </div>
        </div>
    )
}
