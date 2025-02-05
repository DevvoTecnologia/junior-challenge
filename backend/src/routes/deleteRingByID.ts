import { Request, Response } from "express"
import { pool } from "../config/db"
import { Ring } from "../models/ringModel"

export async function deleteRingById(req: Request, res: Response): Promise<any> {
    const { user_id, ring_id } = req.params

    try {
        // Obtém os anéis do usuário
        const userResult = await pool.query('SELECT rings FROM users WHERE id = $1', [user_id])

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        let rings = userResult.rows[0].rings || []

        // Filtra para remover o anel pelo ID
        const updatedRings = rings.filter((ring: Ring) => ring.id !== ring_id)

        // Atualiza o banco de dados
        await pool.query('UPDATE users SET rings = $1 WHERE id = $2', [JSON.stringify(updatedRings), user_id])

        return res.status(200).json({ message: 'Anel removido com sucesso' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro ao remover o anel' })
    }
}
