import { Request, Response, } from "express"
import { pool } from "../config/db"

export async function getUserRings(req: Request, res: Response): Promise<any> {
    const { user_email } = req.params

    try {
        // Verifica se o usuário existe
        const result = await pool.query('SELECT rings FROM users WHERE email = $1', [user_email])

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        // Obtém os anéis do usuário (se não houver, retorna um array vazio)
        const rings = result.rows[0].rings || []

        return res.json({ user_email, rings })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Erro ao buscar os anéis do usuário" })
    }
}
