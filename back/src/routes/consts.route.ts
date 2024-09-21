import { Application } from 'express'
import controllers from '../controllers/consts.controller'

export default function (route: string, app: Application) {
    app.get(route, controllers.getConstantsController)
}
