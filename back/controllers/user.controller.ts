import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password, isAdmin } = req.body

        const user = await prisma.user.findUnique({
            where: { email, password },
        })

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Identifiants invalides' })
        }

        const token = jwt.sign(
            { userId: user.id, role: user.isAdmin },
            process.env.JWT_SECRET || '',
            {
                expiresIn: '2h',
            }
        )

        return res.json({ success: true, token })
    } catch (err) {
        console.error('Erreur lors de la connexion :', err)
        return res.status(500).json({ error: 'Erreur interne du serveur' })
    }
}

export const logout = (req: Request, res: Response) => {
    // Ici, vous pouvez ajouter la logique de déconnexion, comme la destruction de sessions.
    return res.json({ success: true, message: 'Déconnexion réussie' })
}
