import express, { Application, NextFunction, Request, Response } from 'express'

import globalErrorHandler from './controllers/error.controller'
import catRoutes from './routes/cat.route'
import constsRoutes from './routes/consts.route'
import userRoutes from './routes/user.route'
import AppError from './utils/appError'
import corsOptions from './utils/corsOptions'
import initDb from './utils/initDb'
import path from 'path'
import docs from './routes/doc.route'

require('dotenv').config({ path: '.env' })

const PORT = Number(process.env.PORT)

const app: Application = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// cors options
corsOptions(app)

// secure app some best practices
// security(app)

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

    // init db
    initDb()
    // deleteData()

    docs('/api/v1/docs', app)
    // Routes
    catRoutes('/api/v1/cat', app)
    userRoutes('/api/v1/user', app)
    constsRoutes('/api/v1/consts', app)

    // handle inexistant routes
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        next(
            AppError(res, `the url ${req.originalUrl} is not found`, 404, false)
        )
    })

    // handle global errors
    app.use(globalErrorHandler)
})
