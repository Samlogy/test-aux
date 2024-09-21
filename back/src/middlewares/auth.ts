import { NextFunction, Request, Response } from 'express'
import jwt from '../utils/jwt'

export interface AuthenticatedRequest extends Request {
    user?: any
}

const authenticate = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ success: false, error: 'Non autorisé' })
    }

    const { valid, expired, decoded } = jwt.decodeToken(token)

    if (!valid) {
        return res.status(401).json({
            success: false,
            error: `Accès interdit. Token ${
                expired ? 'a expiré' : 'invalide'
            }.`,
        })
    }
    req.user = decoded
    next()
}

const authorize = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.user && req.user.role === true) next()
    else {
        return res.status(403).json({
            success: false,
            error: 'Accès interdit - Vous devez être un administrateur',
        })
    }
}

export default {
    authenticate,
    authorize,
}
