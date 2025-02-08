"use client"

//
import styles from "./styles/render_user_card.module.css"

//
import { RenderRingCard } from "./RenderRingCard"
import { useEffect, useRef, useState } from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { useTranslations } from "next-intl"

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
            <p> { isDashboard ? tI("your_rings") : userName } </p>
            <div className={styles.rings_container}>
                {ringsData.map((ring: any) => (
                    <RenderRingCard key={ring.id} ringData={ring} isDashboard={isDashboard} userEmail={userEmail} />
                ))}
            </div>
            <div className={styles.navigate_btns_box}>
                <button onClick={handlePrevClick}> <AiOutlineArrowLeft /> </button>
                <button onClick={handleNextClick}> <AiOutlineArrowRight /> </button>
            </div>
        </div>
    )
}
