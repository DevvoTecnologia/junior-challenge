import { Request, Response } from "express"
import { pool } from "../config/db"
import jwt from "jsonwebtoken"

export async function userLogin(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body

    try {
        // Verifica se o usuário existe
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])

        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        // Verifica se a senha fornecida corresponde à senha criptografada no banco
        const user = result.rows[0]
        const isPasswordValid = password === user.password ? true : false

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        // Cria um JWT token com o id do usuário
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: "1h" })

        return res.json({
            message: "Sucefull login",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })
        

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}
