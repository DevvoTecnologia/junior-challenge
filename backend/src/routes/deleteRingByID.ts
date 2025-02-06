import { Request, Response } from "express"
import { pool } from "../config/db"
import { Ring } from "../models/ringModel"

export async function deleteRingById(req: Request, res: Response): Promise<any> {
    const { user_email, ring_id } = req.body

    try {
        // Obtém o ID do usuário e os anéis
        const userResult = await pool.query("SELECT id, rings FROM users WHERE email = $1", [user_email])

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }

        const userId = userResult.rows[0].id
        let rings = userResult.rows[0].rings || []

        // Filtra para remover o anel pelo ID
        const updatedRings = rings.filter((ring: Ring) => ring.id !== ring_id)

        // Atualiza o banco de dados corretamente usando o userId
        await pool.query("UPDATE users SET rings = $1 WHERE id = $2", [JSON.stringify(updatedRings), userId])

        return res.status(200).json({ message: "Anel removido com sucesso" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Erro ao remover o anel" })
    }
}
