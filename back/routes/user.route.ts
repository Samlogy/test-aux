import { Application } from 'express'

import controllers from '../controllers/cat.controller'
import { authenticateToken } from '../middlewares/auth'

export default function (route: string, app: Application) {
    app.get(route + '/login', controllers.getCatsController)
    app.post(
        route + '/logout',
        authenticateToken,
        controllers.postCatController
    )
}
