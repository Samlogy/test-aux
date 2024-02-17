import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import hash from '../utils/hash'
import jwt from '../utils/jwt'
import logger from '../utils/logger'

const prisma = new PrismaClient()

export interface AuthenticatedRequest extends Request {
    user?: any
}

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

        const accessToken = jwt.createToken({
            userId: user.id,
            role: user.isAdmin,
        })

        const refreshToken = jwt.createRefreshToken({
            userId: user.id,
            role: user.isAdmin,
        })

        logger.info(
            `user logged in => accessToken ${accessToken} - refreshToken ${refreshToken}`
        )

        return res.status(201).json({
            success: true,
            data: {
                user,
                accessToken,
                refreshToken,
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
    logger.info('user logout !')
    return res
        .status(201)
        .json({ success: true, message: 'Déconnexion réussie' })
}

const refresh = (req: AuthenticatedRequest, res: Response) => {
    try {
        const { refreshToken } = req.body
        const user = req.user

        if (!refreshToken) {
            return res
                .status(400)
                .json({ success: false, error: 'Refresh token is required !' })
        }

        const { valid, expired, decoded } = jwt.decodeToken(refreshToken)

        if (expired) {
            return res
                .status(401)
                .json({ message: 'Token expired, please log again' })
        }

        if (!valid) {
            return res.status(401).json({ message: 'Invalid refresh token' })
        }

        const accessToken = jwt.createToken({
            userId: user.id,
            role: user.isAdmin,
        })

        const refreshToken2 = jwt.createRefreshToken({
            userId: user.id,
            role: user.isAdmin,
        })

        res.status(201).json({
            success: true,
            accessToken,
            refreshToken: refreshToken2,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export default {
    login,
    logout,
    refresh,
}
