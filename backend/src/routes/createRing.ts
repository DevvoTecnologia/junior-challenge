import { Request, Response, } from "express"
import { pool } from "../config/db"
import { Ring } from "../models/ringModel"

export async function createRingForUser(req: Request, res: Response): Promise<any> {
    const { locale, email, name, power, carrier, forjer, image }: Ring & { email: string, locale: string } = req.body

    // Definição dos limites de criação por forjador
    const forjerLimits: Record<string, number> = {
        elfs: 3,
        dwarves: 7,
        humans: 9,
        sauron: 1
    }

    const nameForjers: any = {
        pt: {
            elfs: "Elfos",
            dwarves: "Anões",
            humans: "Humanos",
            sauron: "Sauron"
        },
        en: {
            elfs: "Elves",
            dwarves: "Dwarves",
            humans: "Humans",
            sauron: "Sauron"
        },
        es: {
            elfs: "Elfos",
            dwarves: "Enanos",
            humans: "Humanos",
            sauron: "Sauron"
        }
    }

    function generateLimitForgerMessage(forgerName: string, forgerLimit: number, locale: string): string {
        const localeNameForgers = nameForjers[locale]
    
        const languageMessage: any = {
            pt: `O limite de ${forgerLimit} ${forgerLimit === 1 ? "anel" : "anéis"} para ${localeNameForgers[forgerName]} já foi atingido.`,
            es: `El límite de ${forgerLimit} ${forgerLimit === 1 ? "anillo" : "anillos"} para ${localeNameForgers[forgerName]} ya ha sido alcanzado.`,
            en: `The limit of ${forgerLimit} ${forgerLimit === 1 ? "ring" : "rings"} for ${localeNameForgers[forgerName]} has been reached.`
        }
    
        return languageMessage[locale]
    }
    
    try {
        // Verifica se o usuário existe com base no email
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' })
        }

        // Obtém os anéis já cadastrados desse usuário
        const existingRings: Ring[] = userResult.rows[0].rings || []

        // Conta quantos anéis do mesmo forjador já existem
        const forjerCount = existingRings.filter(ring => ring.forjer === forjer).length

        // Verifica se atingiu o limite
        if (forjerCount >= (forjerLimits[forjer] || 0)) {
            return res.status(400).json({ message: generateLimitForgerMessage(forjer, forjerLimits[forjer], locale) })
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
        await pool.query(
            `UPDATE users 
            SET rings = $1
            WHERE email = $2
            RETURNING *`,
            [JSON.stringify(rings), email]
        )

        return res.status(201).json({
            message: "Anel criado e atribuído ao usuário com sucesso",
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Erro ao criar e atribuir o anel ao usuário" })
    }
}
