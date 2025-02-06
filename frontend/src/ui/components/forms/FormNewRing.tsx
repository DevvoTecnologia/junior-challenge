"use client"
//
import styles from "./styles/form.module.css"
import { useState } from "react"
import { revalidateDashboard } from "@/lib/actions/revalidateDashboard"

export const FormNewRing = ({userEmail}: any) => {
    const [formData, setFormData] = useState({
        email: userEmail,
        name: "",
        power: "",
        carrier: "",
        forjer: "",
        image: "https://gizmodo.uol.com.br/wp-content/blogs.dir/8/files/2022/08/quais-sao-os-aneis-do-poder.webp"
    })
    const [ isPending, setIsPending ] = useState<boolean>(false)
    const [ errorMessage, setErrorMessage ] = useState<string>("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsPending(true)
        setErrorMessage("")

        try {
            const res = await fetch("/api/create-ring", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (!res.ok) {
                setErrorMessage(data.message || "Erro ao forjar o anel.")
                return
            }

        } catch (error) {
            console.error("Erro na requisição:", error)
            setErrorMessage("Erro ao conectar ao servidor. Tente novamente.")

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
                <span>Nome do Anel</span>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                <span>Poder do Anel</span>
                <input
                    type="text"
                    name="power"
                    value={formData.power}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                <span>Portador</span>
                <input
                    type="text"
                    name="carrier"
                    value={formData.carrier}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                <span>Forjador</span>
                <select name="forjer" value={formData.forjer} onChange={handleChange} required>
                    <option value="">Selecione um Forjador</option>
                    <option value="sauron">Sauron</option>
                    <option value="elfs">Elfos</option>
                    <option value="dwarves">Anões</option>
                    <option value="humans">Humanos</option>
                </select>
            </label>
            <label>
                <span>Imagem do Anel</span>
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />
            </label>
            {errorMessage && (
                <p className={styles.error_message}>{errorMessage}</p>
            )}
            <button type="submit" disabled={isPending}>
                {isPending ? "Forjando Anel..." : "Forjar Anel"}
            </button>
        </form>
    )
}
