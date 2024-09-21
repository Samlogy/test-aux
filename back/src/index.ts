import express, { Application, NextFunction, Request, Response } from 'express'
import https from "https"
import fs from "fs"
import path from 'path'
import { Server } from 'http'

import catRoutes from './routes/cat.route'
import constsRoutes from './routes/consts.route'
import userRoutes from './routes/user.route'
import docsRoute from './routes/doc.route';
import healthRoute from './routes/health.route'

import globalErrorHandler from './controllers/error.controller'

import AppError from './utils/appError'
import corsOptions from './utils/corsOptions'
import initDb from './utils/initDb'
import checkSignals, { signals } from './utils/gracefullShutdown'
import logger from './utils/logger'

require('dotenv').config({ path: '../.env' })

console.log('Current Environment:', process.env.NODE_ENV);


const NODE_ENV = process.env.NODE_ENV || 'dev'
const HTTP_PORT = Number(process.env.HTTP_PORT)
const HTTPS_PORT = Number(process.env.HTTPS_PORT)

const app: Application = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

  
export const createHttpsServer = (app: Application, port: number) => {
    const options = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    };

    return https.createServer(options, app).listen(port, () => {
        logger.info(`Server: ${port} => ${NODE_ENV}`)

        checkSignals(server, signals)

        // init db
        initDb()
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
      });
}

export const createHttpServer = (app: Application, port: number) => {
    return app.listen(port, () => {
        logger.info(`Server: ${port} => ${NODE_ENV}`)

        checkSignals(server, signals)

        // init db
        initDb()
        // deleteData()

        // Routes
        healthRoute('/api/v1/health', app)
        catRoutes('/api/v1/cat', app)
        userRoutes('/api/v1/user', app)
        constsRoutes('/api/v1/consts', app)
        docsRoute('/api/v1/doc', app)

        // handle inexistant routes
        app.use(notFoundRoute)

        // handle global errors
        app.use(globalErrorHandler)
    })
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


let server: https.Server | Server;

// cors options
corsOptions(app)

// secure app some best practices
// security(app)

// environment (dev - prod)
if (NODE_ENV === 'prod') {
    server = createHttpsServer(app, HTTPS_PORT)

    app.all('*', (req, res, next) => {
        if (req.secure) return next()
        else if (req.hostname == 'backend') next()
        return res.redirect(
            307,
            `https://${req.hostname}:${app.get('port')}${req.url}`
        )
    })
}

if (NODE_ENV === 'dev') {
    server = createHttpServer(app, HTTP_PORT);
}

// unhandled promise rejection
process.on('unhandledRejection', (err: Error) => {
    console.log(`Shutting down the server for ${err.message}`)
    console.log('Shutting down the server for unhandled promise rejection')

    server.close(() => process.exit(1))
})
