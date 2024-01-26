import { NextFunction, Request, Response } from 'express'
import { decodeToken } from '../utils/jwt'

interface AuthenticatedRequest extends Request {
    user?: any
}

export const authenticateToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Non autorisé' })
    }

    const { valid, expired, decoded } = decodeToken(token)

    if (!valid) {
        return res.status(401).json({
            message: `Accès interdit. Token ${
                expired ? 'a expiré' : 'invalide'
            }.`,
        })
    }
    req.user = decoded
    next()
}

export const isAdmin = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.user && req.user.role === true) {
        next()
    } else {
        return res.status(403).json({
            error: 'Accès interdit - Vous devez être un administrateur',
        })
    }
}
