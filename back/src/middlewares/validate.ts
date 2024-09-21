import { z, ZodError } from 'zod'
import { Request, Response, NextFunction } from 'express'

const validate = (schema: z.ZodObject<any, any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)

            next()
        } catch (err) {
            if (err instanceof ZodError) {
                const details = err.errors.map((err) => ({
                    message: err.message,
                    path: err.path[0],
                }))

                return res.status(400).json({
                    success: false,
                    error: details,
                })
            }

            console.error(err)
            res.status(500).json({
                success: false,
                error: 'Internal server error',
            })
        }
    }
}
export default validate
