import { Request, Response } from "express"
import { pool } from "../config/db"

export async function getUsersWithRings(_req: Request, res: Response): Promise<any> {
    try {
        const result = await pool.query('SELECT id, name, rings FROM users')

        // Formata os dados antes de enviar
        const users = result.rows.map((user: any) => ({
            name: user.name,
            rings: user.rings || []
        }))

        return res.json(users)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro ao buscar usuários' })
    }
}
