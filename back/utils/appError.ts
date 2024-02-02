import { Response } from 'express'

export default function AppError(
    res: Response,
    message: string,
    statusCode = 500,
    error = {}
) {
    res.status(statusCode).json({
        success: false,
        message,
        error: {
            statusCode,
            message,
            error,
        },
    })
}
