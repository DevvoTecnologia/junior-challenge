"use client"
//
import styles from "./styles/form.module.css"
import gifTS from "@/resourses/assets/I17F.gif"

//
import { useState } from "react"
import { useTranslations } from "next-intl"

//
import { revalidateDashboard } from "@/lib/actions/revalidateDashboard"
import { RenderForgerName } from "@/ui/components/RenderForgerName"
import Image from "next/image"

const ringsImages = [
    "https://i.ibb.co/xqCcdcNq/1.png",
    "https://i.ibb.co/svprFsdW/2.png",
    "https://i.ibb.co/dsGcLm8V/3.png",
    "https://i.ibb.co/WNmsVgCq/4.png",
    "https://i.ibb.co/fdfdwGT2/5.png",
    "https://i.ibb.co/qLPbKqhW/6.png"
]

export const FormEditRing = ({ userEmail, ringData }: {userEmail: string, ringData: any}) => {
    const tI = useTranslations("Index")
    const tE = useTranslations("ErrorMessages")

    const [formData, setFormData] = useState({
        email: userEmail,
        ringID: ringData.id,
        name: ringData.name,
        power: ringData.power,
        carrier: ringData.carrier,
        forjer: ringData.forjer,
        image: ringData.image
    })

    const [isPending, setIsPending] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsPending(true)
        setErrorMessage("")

        try {
            const res = await fetch("/api/update-ring", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (!res.ok) {
                setErrorMessage(data.message || tE("error_forge"))
                return
            }

        } catch (error) {
            console.error("Erro na requisição:", error)
            setErrorMessage(tE("error_connect"))

        } finally {
            await revalidateDashboard()
            setIsPending(false)
        }
    }

    function handleChange(e: any) {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label>
                <span> {tI("ring_name")} </span>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                <span> {tI("ring_power")} </span>
                <input
                    type="text"
                    name="power"
                    value={formData.power}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                <span> {tI("carrie")} </span>
                <input
                    type="text"
                    name="carrier"
                    value={formData.carrier}
                    onChange={handleChange}
                    required
                />
            </label>
            <label className={styles.label_with_select}>
                <span> {tI("forger")} </span>
                <select name="forjer" value={formData.forjer} onChange={handleChange} required>
                    <option value=""> {tI("select_forger")} </option>
                    <option value="sauron">
                        <RenderForgerName forger="sauron" />
                    </option>
                    <option value="elfs">
                        <RenderForgerName forger="elfs" />
                    </option>
                    <option value="dwarves">
                        <RenderForgerName forger="dwarves" />
                    </option>
                    <option value="humans">
                        <RenderForgerName forger="humans" />
                    </option>
                </select>
            </label>
            <label>
                <span> {tI("ring_image")} </span>
                <div className={styles.images_container}>
                    {ringsImages.map((image, index) => (
                        <label key={index}>
                            <input
                                type="radio"
                                name="image"
                                value={image}
                                checked={formData.image === image}
                                onChange={handleChange}
                            />
                            <div className={`${formData.image === image ? styles.img_selected : ""}`}>
                                <Image
                                    src={image}
                                    alt={`Option ${index}`}
                                    height={100}
                                    width={100}
                                />
                            </div>
                        </label>
                    ))}
                </div>
            </label>
            {errorMessage && (
                <p className={styles.error_message}>{errorMessage}</p>
            )}
            <button type="submit" disabled={isPending}>
                {isPending ? tI("re_forging") : tI("re_forge_ring")}
            </button>
            {isPending && (
                <div className={styles.forge_gif}>
                    <Image
                        src={gifTS}
                        alt="Imagem de forja"
                        height={245}
                        width={270}
                    />
                </div>
            )}
        </form>
    )
}
