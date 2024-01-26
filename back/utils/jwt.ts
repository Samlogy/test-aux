import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || ''

export const createToken = (data: any): string => {
    return jwt.sign(data, JWT_SECRET || '', { expiresIn: '1d' })
}

export function decodeToken(token: string) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return { valid: true, expired: false, decoded }
    } catch (err: any) {
        return {
            valid: false,
            expired: err.message === 'jwt expired',
            decoded: null,
        }
    }
}
