import { Request, Response } from "express"
import { pool } from "../config/db"

export async function updateRing(req: Request, res: Response): Promise<any> {
    const { user_id, ring_id } = req.params
    const { name, power, carrier, forjer, image } = req.body

    try {
        // Obtém os anéis do usuário
        const userResult = await pool.query('SELECT rings FROM users WHERE id = $1', [user_id])

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        let rings = userResult.rows[0].rings || []

        // Procura o anel pelo ID
        const ringIndex = rings.findIndex((ring: any) => ring.id === Number(ring_id))

        if (ringIndex === -1) {
            return res.status(404).json({ message: 'Anel não encontrado' })
        }

        // Atualiza apenas os campos enviados no body
        rings[ringIndex] = {
            ...rings[ringIndex], // Mantém os valores antigos
            name: name ?? rings[ringIndex].name,
            power: power ?? rings[ringIndex].power,
            carrier: carrier ?? rings[ringIndex].carrier,
            forjer: forjer ?? rings[ringIndex].forjer,
            image: image ?? rings[ringIndex].image
        }

        // Atualiza o banco de dados
        await pool.query('UPDATE users SET rings = $1 WHERE id = $2', [JSON.stringify(rings), user_id])

        return res.json({ message: 'Anel atualizado com sucesso', ring: rings[ringIndex] })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Erro ao atualizar o anel' })
    }
}
