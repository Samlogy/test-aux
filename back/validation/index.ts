import { z } from 'zod'

const loginSchema = z.object({
    email: z.string().email({ message: 'Provide a valid Email' }),
    password: z
        .string()
        .min(4, { message: 'Password must be at least 12 characters long' }),
})

export default {
    loginSchema,
}
