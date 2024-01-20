import { Application } from 'express'
import { isAdmin, authenticateToken } from '../middlewares/auth'
import controllers from '../controllers/cat.controller'

export default function (route: string, app: Application) {
    app.get(route, controllers.getCatsController)
    app.get(route + '/:id', controllers.getCatByIdCatController)
    app.get(route + '/filter', controllers.filtersCatsController)
    app.post(route, authenticateToken, isAdmin, controllers.postCatController)
    app.put(
        route + '/:id',
        authenticateToken,
        isAdmin,
        controllers.putCatByIdController
    )
    app.delete(
        route + '/:id',
        authenticateToken,
        isAdmin,
        controllers.deleteCatByIdController
    )
}
