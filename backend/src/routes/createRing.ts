import { Request, Response, } from "express"
import { pool } from "../config/db"
import { Ring } from "../models/ringModel"

export async function createRingForUser(req: Request, res: Response): Promise<any> {
    const { user_id, name, power, carrier, forjer, image }: Ring & { user_id: number } = req.body

    // Definição dos limites de criação por forjador
    const forjerLimits: Record<string, number> = {
        elfs: 3,
        dwarves: 7,
        humans: 9,
        sauron: 1
    }

    try {
        // Verifica se o usuário existe
        const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [user_id])

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        // Obtém os anéis já cadastrados desse usuário
        const existingRings: Ring[] = userResult.rows[0].rings || []

        // Conta quantos anéis do mesmo forjador já existem
        const forjerCount = existingRings.filter(ring => ring.forjer === forjer).length

        // Verifica se atingiu o limite
        if (forjerCount >= (forjerLimits[forjer] || 0)) {
            return res.status(400).json({ message: `O limite de ${forjerLimits[forjer]} anéis para ${forjer} já foi atingido.` })
        }

        let rings = userResult.rows[0].rings || []

        const newRing = {
            id: rings.length + 1,
            name,
            power,
            carrier,
            forjer,
            image
        }

        rings.push(newRing)

        // Atualiza o usuário com o novo array de anéis
        const result = await pool.query(
            `UPDATE users 
            SET rings = $1
            WHERE id = $2
            RETURNING *`,
            [JSON.stringify(rings), user_id]
        )

        return res.status(201).json({
            message: "Anel criado e atribuído ao usuário com sucesso",
            user: result.rows[0]
        })


    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Erro ao criar e atribuir o anel ao usuário" })
    }
}
