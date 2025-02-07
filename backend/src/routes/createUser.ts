import { Request, Response, } from "express"
import { User } from "../models/userModel"
import { pool } from "../config/db"

export async function createUser(req: Request, res: Response): Promise<any> {
    const { name, email, password }: User = req.body

    try {
        await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
            [name, email, password]
        )

        return res.status(201).end() // Apenas retorna o código 201 sem mensagem

    } catch (error) {
        console.error("Error creating user:", error)
        return res.status(500).end() // Apenas código de erro
    }
}
