import Express, { Application } from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
const xssCleaner = require('xss-clean')

export default function (app: Application) {
    app.use(helmet())

    const limiter = rateLimit({
        windowMs: 60 * 60 * 1000,
        max: 100,
        message:
            'Too many accounts created from this IP, please try again after an hour',
        standardHeaders: true,
        legacyHeaders: false,
    })
    app.use(limiter)
    app.use(xssCleaner())
}
