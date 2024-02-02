import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import hash from '../utils/hash'
import jwt from '../utils/jwt'

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

        const isPasswordCorrect = await hash.verifyPassword(
            password,
            user.password
        )

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Identifiants invalides' })
        }

        const token = jwt.createToken({ userId: user.id, role: user.isAdmin })

        return res.status(201).json({
            success: true,
            data: {
                user,
                token,
            },
        })
    } catch (err) {
        console.error('Erreur lors de la connexion :', err)
        return res
            .status(500)
            .json({ success: false, error: 'Erreur interne du serveur' })
    }
}

const logout = (req: Request, res: Response) => {
    return res
        .status(201)
        .json({ success: true, message: 'Déconnexion réussie' })
}

export default {
    login,
    logout,
}
