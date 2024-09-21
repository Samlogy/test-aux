import express, { Application, NextFunction, Request, Response } from 'express'
import https from "https"
import fs from "fs"
import path from 'path'
import { Server } from 'http'
import session from 'express-session'
import cookieParser from 'cookie-parser'

import catRoutes from './routes/cat.route'
import constsRoutes from './routes/consts.route'
import userRoutes from './routes/user.route'
import healthRoute from './routes/health.route'

import globalErrorHandler from './middlewares/error'

import docSwagger from "./utils/doc"
import AppError from './utils/appError'
import corsOptions from './utils/corsOptions'
import initDb from './utils/initDb'
import checkSignals, { signals } from './utils/gracefullShutdown'
import logger from './utils/logger'

require('dotenv').config({ path: '../.env' })

// console.log('Current Environment:', process.env.NODE_ENV);


const NODE_ENV = process.env.NODE_ENV || 'dev'
const HTTP_PORT = Number(process.env.HTTP_PORT as string) || ''
const HTTPS_PORT = Number(process.env.HTTPS_PORT as string) || ''
const HOST_DEV = process.env.HOST_DEV as string || "";
const HOST_PROD = process.env.HOST_PROD as string || "";
const COOKIE_EXPIRESIN = parseInt(process.env.COOKIE_EXPIRESIN as string)
const SESSION_SECRET = process.env.SESSION_SECRET || ""

const app: Application = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(cookieParser());

const sessionConfig = session({
    secret: SESSION_SECRET,
    // keys: ['some random key'],
    resave: false,
    saveUninitialized: false,
    name: 'sessid',
    cookie: {
        maxAge: COOKIE_EXPIRESIN, // Used for expiration time.
        sameSite: 'strict', // Cookies will only be sent in a first-party context. 'lax' is default value for third-parties.
        httpOnly: true, //Ensures the cookie is sent only over HTTP(S)
        domain: HOST_DEV, //Used to compare against the domain of the server in which the URL is being requested.
        secure: false // Ensures the browser only sends the cookie over HTTPS. false for localhost.
    }
});
app.use(sessionConfig);

  
export const createHttpsServer = (app: Application) => {
    const options = {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem')
    };

    return https.createServer(options, app).listen(HOST_PROD, () => {
        logger.info(`Server: ${HTTPS_PORT} => ${NODE_ENV}`)

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

export const createHttpServer = (app: Application) => {
    return app.listen(HTTP_PORT, () => {
        logger.info(`Server: ${HTTP_PORT} => ${NODE_ENV}`)

        checkSignals(server, signals)

        // init db
        // initDb()
        // deleteData()

        //doc
        docSwagger(app)

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
    server = createHttpsServer(app)

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
    server = createHttpServer(app);
}

// unhandled promise rejection
process.on('unhandledRejection', (err: Error) => {
    console.log(`Shutting down the server for ${err.message}`)
    console.log('Shutting down the server for unhandled promise rejection')

    server.close(() => process.exit(1))
})
