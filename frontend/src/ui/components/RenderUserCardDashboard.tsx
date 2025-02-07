"use client"

//
import styles from "./styles/render_user_card.module.css"

//

//
import { NewRingBtn } from "./btns/NewRingBtn"
import { RenderRingCard } from "./RenderRingCardDashboard"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"

export const RenderUserCard = ({ userEmail, ringsData }: any) => {
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
                <p> {tI("your_rings")} </p>
                <NewRingBtn userEmail={userEmail} />
            </div>
            <div className={styles.rings_container} ref={containerRef}>
                {ringsData?.length > 0 ? (<>
                    {ringsData.map((ring: any) => (
                        <RenderRingCard key={ring.id} ringData={ring} userEmail={userEmail} />
                    ))}</>
                ) : (
                    <p>{tI("empty_ring")}</p>
                )}
            </div>
            <div className={styles.navigate_btns_box}>
                <button onClick={handlePrevClick}> <AiOutlineArrowLeft /> </button>
                <button onClick={handleNextClick}> <AiOutlineArrowRight /> </button>
            </div>
        </div>
    )
}
