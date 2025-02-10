//
import styles from "./styles/home_page.module.css"

//
import { useTranslations } from "next-intl"

//
import { RenderUserCard } from "@/ui/components/RenderUserCard"
import { LoginOptions } from "@/ui/components/LoginOptions"

//
type HomePageTypes = {
    ringsData: any
}

export const HomePage = ({ ringsData }: HomePageTypes) => {
    const tI = useTranslations("Index")

    return (
        <div className={styles.home_container}>
            <div className={styles.header_container}>
                <h1 className={styles.title}>
                    {tI("rings_power")}
                </h1>
                <LoginOptions />
            </div>
            {ringsData && ringsData.length > 0 ? (<>
                {ringsData.map((user: any, index: number) => (<>
                    {user.rings.length > 0 ? (
                        <RenderUserCard key={user.name + index} userName={user.name} ringsData={user.rings} isDashboard={false}  />
                    ) : ""}
                </>))}
            </>) : (
                <p className={styles.empty}>
                    {tI("empty_ring")}
                </p>
            )}
        </div>
    )
}
