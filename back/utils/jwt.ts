import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || ''
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || ''

const createToken = (data: any): string => {
    return jwt.sign(data, JWT_SECRET || '', { expiresIn: '1h' })
}

function decodeToken(token: string) {
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

const createRefreshToken = (data: any): string => {
    return jwt.sign(data, JWT_REFRESH_TOKEN_SECRET || '', { expiresIn: '7d' })
}

// function decodeRefreshToken(token: string) {
//     try {
//         const decoded = jwt.verify(token, JWT_SECRET)
//         return { valid: true, expired: false, decoded }
//     } catch (err: any) {
//         return {
//             valid: false,
//             expired: err.message === 'jwt expired',
//             decoded: null,
//         }
//     }
// }

export default {
    decodeToken,
    createToken,
    createRefreshToken,
}
