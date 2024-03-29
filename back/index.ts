import express, { Application, NextFunction, Request, Response } from 'express'
import globalErrorHandler from './controllers/error.controller'
import catRoutes from './routes/cat.route'
import constsRoutes from './routes/consts.route'
import userRoutes from './routes/user.route'
import AppError from './utils/appError'
import corsOptions from './utils/corsOptions'
import initDb from './utils/initDb'
import path from 'path'
import docsRoute from './routes/doc.route'
import healthRoute from './routes/health.route'
import checkSignals, { signals } from './utils/gracefullShutdown'
import logger from './utils/logger'

require('dotenv').config({ path: '.env' })

const PORT = Number(process.env.PORT)
const ENVIRONMENT = process.env.NODE_ENV || 'dev'

const app: Application = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// cors options
corsOptions(app)

// secure app some best practices
// security(app)

// environment (dev - prod)
if (ENVIRONMENT === 'prod') {
    app.all('*', (req, res, next) => {
        if (req.secure) return next()
        else if (req.hostname == 'backend') next()
        return res.redirect(
            307,
            `https://${req.hostname}:${app.get('port')}${req.url}`
        )
    })
}

if (ENVIRONMENT === 'dev') {
    docsRoute('/api/v1/docs', app)
}

export const notFoundRoute = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        next(
            AppError(res, `the url ${req.originalUrl} is not found`, 404, false)
        )
    })
}

export const createServer = (port: number) => {
    return app.listen(port, () => {
        logger.info(`Server: ${port} => ${ENVIRONMENT}`)

        checkSignals(server, signals)

        // init db
        // initDb()
        // deleteData()

        // Routes
        healthRoute('/api/v1/health', app)
        catRoutes('/api/v1/cat', app)
        userRoutes('/api/v1/user', app)
        constsRoutes('/api/v1/consts', app)

        // handle inexistant routes
        app.use(notFoundRoute)

        // handle global errors
        app.use(globalErrorHandler)
    })
}

const server = createServer(PORT)

// unhandled promise rejection
process.on('unhandledRejection', (err: Error) => {
    console.log(`Shutting down the server for ${err.message}`)
    console.log('Shutting down the server for unhandled promise rejection')

    server.close(() => process.exit(1))
})
