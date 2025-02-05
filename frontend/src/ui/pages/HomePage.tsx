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
    const t = useTranslations("Index")

    return (
        <div className={styles.home_container}>
            <div className={styles.header_container}>
                <h1 className={styles.title}>{t("rings_power")}</h1>
                <LoginOptions />
            </div>
            {ringsData ? (<>
                {ringsData.map((user: any, index: number) => (<>
                    {user.rings.length > 0 ? (
                        <RenderUserCard userData={user} key={user.name + index} />
                    ) : ""}
                </>))}
            </>) : (
                <p>Nenhum Anel Cadastrado.</p>
            )}
        </div>
    )
}
