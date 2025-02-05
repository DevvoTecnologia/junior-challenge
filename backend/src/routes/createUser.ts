import { Request, Response, } from "express"
import { User } from "../models/userModel"
import { pool } from "../config/db"

export async function createUser(req: Request, res: Response): Promise<any> {
    const { name, email, password }: User = req.body

    try {
        const result = await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, password]
        )

        return res.status(201).json({
            message: "User created successfully",
            user: result.rows[0]
        })
        
    } catch (error) {
        console.error("Error creating user:", error)
        return res.status(500).json({ error: "Internal server error" })
    }
}
