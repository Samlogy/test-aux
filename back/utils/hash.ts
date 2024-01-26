import bcrypt from 'bcrypt'

const SALT_ROUND = process.env.SALT_ROUND

export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, Number(SALT_ROUND))
    return hashedPassword
}

export const verifyPassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    const match = await bcrypt.compare(password, hashedPassword)
    return match
}
