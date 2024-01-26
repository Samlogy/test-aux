import { Application } from 'express'

import controllers from '../controllers/user.controller'
import { authenticateToken } from '../middlewares/auth'

export default function (route: string, app: Application) {
    app.post(route + '/login', controllers.login)
    app.post(route + '/logout', authenticateToken, controllers.logout)
}
