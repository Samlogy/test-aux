import { Application } from 'express'

export default function (route: string, app: Application) {
    app.get(route, (req, res) => {
        res.status(200).json({ status: 'OK', message: 'API is healthy' })
    })
}
