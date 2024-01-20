import express, { Application, NextFunction, Request, Response } from 'express'

import { globalErrorHandler } from './controllers/errorController'
import catRoutes from './routes/cat.route'
import userRoutes from './routes/user.route'
import { AppError } from './utils/appError'
import corsOptions from './utils/corsOptions'
import security from './utils/security'
require('dotenv').config({ path: '.env' })

const PORT = Number(process.env.PORT)

const app: Application = express()

app.use(express.urlencoded({ extended: false }))

// cors options
corsOptions(app)

// secure app some best practices
security(app)

// environment (dev - prod)
if (process.env.NODE_ENV === 'prod') {
    app.all('*', (req, res, next) => {
        if (req.secure) return next()
        else if (req.hostname == 'backend') next()
        return res.redirect(
            307,
            `https://${req.hostname}:${app.get('secPort')}${req.url}`
        )
    })
}

app.listen(PORT, () => {
    console.log(`Server: `, PORT)

    // Routes
    catRoutes('/api/v1/cat', app)
    userRoutes('/api/v1/user', app)

    // handle inexistant routes
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        next(
            AppError(res, `the url ${req.originalUrl} is not found`, 404, false)
        )
    })

    app.use(globalErrorHandler)
})
