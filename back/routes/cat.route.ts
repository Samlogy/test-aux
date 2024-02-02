import { Application } from 'express'
import multer from 'multer'
import controllers from '../controllers/cat.controller'
import auth from '../middlewares/auth'
import storage from '../utils/storage'

const upload = multer({ storage })

export default function (route: string, app: Application) {
    app.get(
        route + '/filter',
        auth.authenticate,
        controllers.filtersCatsController
    )
    app.put(
        route + '/:id',
        auth.authenticate,
        auth.authorize,
        upload.single('image'),
        controllers.putCatByIdController
    )
    app.delete(
        route + '/:id',
        auth.authenticate,
        auth.authorize,
        controllers.deleteCatByIdController
    )
    app.get(route, auth.authenticate, controllers.getCatsController)
    app.post(
        route,
        auth.authenticate,
        auth.authorize,
        upload.single('image'),
        controllers.postCatController
    )

    app.post(
        route + '/fav/:catId/user/:userId',
        auth.authenticate,
        controllers.setFavoriteCatController
    )
    app.post(
        route + '/adopt/:catId/user/:userId',
        auth.authenticate,
        controllers.requestAdoptionController
    )
    app.delete(
        route + '/adopt/:catId/user/:userId',
        auth.authenticate,
        controllers.cancelAdoptionController
    )
    app.patch(
        route + '/adopt/:catId/user/:userId',
        auth.authenticate,
        auth.authorize,
        controllers.approveAdoptionRequestController
    )
    app.get(
        route + '/adopt',
        auth.authenticate,
        auth.authorize,
        controllers.getAdoptionRequestsController
    )
    app.get(
        route + '/adopt/user/:userId',
        auth.authenticate,
        auth.authorize,
        controllers.getAdoptionRequestsByUserIdController
    )
}
