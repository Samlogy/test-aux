import { Application } from 'express'
import multer from 'multer'
import controllers from '../controllers/cat.controller'
import { authenticateToken, isAdmin } from '../middlewares/auth'
import storage from '../utils/storage'

const upload = multer({ storage })

export default function (route: string, app: Application) {
    app.get(route, controllers.getCatsController)
    app.get(route + '/filter', controllers.filtersCatsController)
    app.get(route + '/:id', controllers.getCatByIdCatController)
    app.post(
        route,
        authenticateToken,
        isAdmin,
        // upload.single('image'),
        controllers.postCatController
    )
    app.put(
        route + '/:id',
        authenticateToken,
        isAdmin,
        // upload.single('image'),
        controllers.putCatByIdController
    )
    app.delete(
        route + '/:id',
        authenticateToken,
        isAdmin,
        controllers.deleteCatByIdController
    )
    app.patch(
        route + '/adopt/:id',
        // authenticateToken,
        controllers.adoptCatController
    )
}
