"use client"

//
import styles from "./styles/render_user_card.module.css"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

//
import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

//
import { RenderRingCard } from "./RenderRingCard"
import { NewRingBtn } from "./btns/NewRingBtn"

//
type RenderUserCardTypes = {
    userEmail?: string
    userName?: string
    ringsData: any
    isDashboard: boolean
}

export const RenderUserCard = ({ userEmail, userName, ringsData, isDashboard }: RenderUserCardTypes) => {
    const tI = useTranslations("Index")
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [containerWidth, setContainerWidth] = useState<number>(0)

    function handleNextClick() {
        if (containerRef.current) {
            containerRef.current.scrollLeft += containerWidth / 2
        }
    }

    function handlePrevClick() {
        if (containerRef.current) {
            containerRef.current.scrollLeft -= containerWidth / 2
        }
    }

    function handleContainerResize() {
        if (containerRef.current) {
            const containerDimensions = containerRef.current.getBoundingClientRect()
            setContainerWidth(containerDimensions.width)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleContainerResize)
        handleContainerResize()
        return () => {
            window.removeEventListener("resize", handleContainerResize)
        }
    }, [])

    return (
        <div className={styles.user_container}>
            <div className={styles.header_rings_container}>
                <p>{isDashboard ? tI("your_rings") : userName}</p>
                {isDashboard && userEmail && (
                    <NewRingBtn userEmail={userEmail} />
                )}
            </div>
            <div className={styles.rings_container}>
                {ringsData.lenght > 0 ? (<>
                    {ringsData.map((ring: any) => (
                        <RenderRingCard key={ring.id} ringData={ring} isDashboard={isDashboard} userEmail={userEmail} />
                    ))}
                </>) : (
                    <p className={styles.empty}>
                        {tI("empty_ring")}
                    </p>
                )}
            </div>
            <div className={styles.navigate_btns_box}>
                <button onClick={handlePrevClick}> <AiOutlineArrowLeft /> </button>
                <button onClick={handleNextClick}> <AiOutlineArrowRight /> </button>
            </div>
        </div>
    )
}
