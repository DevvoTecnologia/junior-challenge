import { Request, Response } from "express"
import { pool } from "../config/db"

export async function updateRing(req: Request, res: Response): Promise<any> {
    const { user_email, ring_id } = req.params
    const { name, power, carrier, forjer, image } = req.body

    if (!user_email || !ring_id) {
        return res.status(400).json({ message: "Parâmetros inválidos" })
    }

    try {
        // Obtém os anéis do usuário
        const userResult = await pool.query("SELECT rings FROM users WHERE email = $1", [user_email])

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }

        let rings = userResult.rows[0].rings || []

        // Procura o anel pelo ID
        const ringIndex = rings.findIndex((ring: any) => String(ring.id) === ring_id)

        if (ringIndex === -1) {
            return res.status(404).json({ message: "Anel não encontrado" })
        }

        // Atualiza apenas os campos enviados no body
        rings[ringIndex] = {
            ...rings[ringIndex],
            name: name ?? rings[ringIndex].name,
            power: power ?? rings[ringIndex].power,
            carrier: carrier ?? rings[ringIndex].carrier,
            forjer: forjer ?? rings[ringIndex].forjer,
            image: image ?? rings[ringIndex].image,
        }

        // Atualiza o banco de dados
        await pool.query("UPDATE users SET rings = $1 WHERE email = $2", [JSON.stringify(rings), user_email])

        return res.json({ message: "Anel atualizado com sucesso", ring: rings[ringIndex] })
    } catch (error) {
        console.error("Erro ao atualizar o anel:", error)
        return res.status(500).json({ message: "Erro interno ao atualizar o anel" })
    }
}
