import { Request, Response } from "express"
import { pool } from "../config/db"

export async function deleteAllUsers(req: Request, res: Response): Promise<any> {
    try {
        // Apaga todos os registros da tabela 'users'
        await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE")

        return res.status(200).json({ message: "Todos os usuários foram removidos com sucesso." })
    } catch (error) {
        console.error("Erro ao deletar todos os usuários:", error)
        return res.status(500).json({ message: "Erro interno ao deletar usuários." })
    }
}
