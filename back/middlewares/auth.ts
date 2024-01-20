import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface AuthenticatedRequest extends Request {
    user?: any
}

export const authenticateToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ error: 'Non autorisé' })
    }

    jwt.verify(token, process.env.JWT_SECRET || '', (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ error: 'Accès interdit' })
        }

        req.user = user
        next()
    })
}

export const isAdmin = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.user && req.user.role === 'admin') {
        next() // L'utilisateur est un administrateur, continuer
    } else {
        return res.status(403).json({
            error: 'Accès interdit - Vous devez être un administrateur',
        })
    }
}
