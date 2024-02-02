import bcrypt from 'bcrypt'

const SALT_ROUND = process.env.SALT_ROUND

const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, Number(SALT_ROUND))
    return hashedPassword
}

const verifyPassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    const match = await bcrypt.compare(password, hashedPassword)
    return match
}

export default {
    hashPassword,
    verifyPassword,
}
