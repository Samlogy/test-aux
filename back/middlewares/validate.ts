import { z, ZodError } from 'zod'
import { Request, Response, NextFunction } from 'express'

const validate = (schema: z.ZodObject<any, any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validate the request body against the Zod schema
            schema.parse(req.body)

            // If validation is successful, proceed to the next middleware
            next()
        } catch (error) {
            // Handle validation errors
            if (error instanceof ZodError) {
                const details = error.errors.map((err) => ({
                    message: err.message,
                    path: err.path[0],
                }))

                return res.status(400).json({
                    success: false,
                    error: details,
                })
            }

            // Handle unexpected errors
            console.error(error)
            res.status(500).json({
                success: false,
                error: 'Internal server error',
            })
        }
    }
}
export default validate
