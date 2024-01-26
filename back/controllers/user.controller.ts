import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { verifyPassword } from '../utils/hash'
import { createToken } from '../utils/jwt'

const prisma = new PrismaClient()

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return res.status(401).json({ error: 'Identifiants invalides' })
        }

        const isPasswordCorrect = await verifyPassword(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Identifiants invalides' })
        }

        const token = createToken({ userId: user.id, role: user.isAdmin })

        return res.json({
            success: true,
            data: {
                user,
                token,
            },
        })
    } catch (err) {
        console.error('Erreur lors de la connexion :', err)
        return res.status(500).json({ error: 'Erreur interne du serveur' })
    }
}

const logout = (req: Request, res: Response) => {
    return res.json({ success: true, message: 'Déconnexion réussie' })
}

export default {
    login,
    logout,
}
