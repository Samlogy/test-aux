import { Application } from 'express'

import controllers from '../controllers/user.controller'
import auth from '../middlewares/auth'
import validationSchema from '../validation'
import validate from '../middlewares/validate'
import catchAsync from '../utils/catchAsync'

export default function (route: string, app: Application) {
    app.post(
        route + '/login',
        validate(validationSchema.loginSchema),
        catchAsync(controllers.login)
    )
    app.post(
        route + '/logout',
        auth.authenticate,
        catchAsync(controllers.logout)
    )
    app.post(
        route + '/refresh',
        auth.authenticate,
        catchAsync(controllers.refresh)
    )
}
