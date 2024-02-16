import { Application } from 'express'

import controllers from '../controllers/user.controller'
import auth from '../middlewares/auth'
import validationSchema from '../validation'
import validate from '../middlewares/validate'

export default function (route: string, app: Application) {
    app.post(
        route + '/login',
        validate(validationSchema.loginSchema),
        controllers.login
    )
    app.post(route + '/logout', auth.authenticate, controllers.logout)
    app.post(route + '/refresh', auth.authenticate, controllers.refresh)
}
