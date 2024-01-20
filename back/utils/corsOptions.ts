import { Application, Request } from 'express'
import cors from 'cors'

const allowList = ['http://localhost:3000']

const corsManip = (req: Request, callback: any) => {
    let corsOptions
    const origin = req.header('Origin') as string

    if (allowList.indexOf(origin) !== -1) {
        corsOptions = { origin: true } // enable requested origin in cors response
    } else {
        corsOptions = { origin: false } // disable cors in reponse
    }
    callback(null, corsOptions)
}

export default function (app: Application) {
    app.use(cors(corsManip))
}
