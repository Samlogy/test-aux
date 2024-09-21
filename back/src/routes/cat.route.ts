import { Application } from 'express'
import multer from 'multer'
import controllers from '../controllers/cat.controller'
import auth from '../middlewares/auth'
import storage from '../utils/storage'
import catchAsync from '../utils/catchAsync'
import validate from '../middlewares/validate'
import validationSchema from '../validation'

const upload = multer({ storage })

export default function (route: string, app: Application) {
    app.get(
        route + '/filter',
        //auth.authenticate,
        catchAsync(controllers.filtersCatsController)
    )
    app.put(
        route + '/:id',
        auth.authenticate,
        auth.authorize,
        upload.single('image'),
        catchAsync(controllers.putCatByIdController)
    )
    app.delete(
        route + '/:id',
        auth.authenticate,
        auth.authorize,
        catchAsync(controllers.deleteCatByIdController)
    )
    app.get(
        route,
        // auth.authenticate,
        catchAsync(controllers.getCatsController)
    )
    app.post(
        route,
        // auth.authenticate,
        // auth.authorize,
        upload.single('image'),
        validate(validationSchema.postCatSchema),
        catchAsync(controllers.postCatController)
    )

    app.post(
        route + '/fav/:catId/user/:userId',
        auth.authenticate,
        catchAsync(controllers.setFavoriteCatController)
    )
    app.post(
        route + '/adopt/:catId/user/:userId',
        auth.authenticate,
        catchAsync(controllers.requestAdoptionController)
    )
    app.delete(
        route + '/adopt/:catId/user/:userId',
        auth.authenticate,
        catchAsync(controllers.cancelAdoptionController)
    )
    app.patch(
        route + '/adopt/:catId/user/:userId',
        auth.authenticate,
        auth.authorize,
        catchAsync(controllers.approveAdoptionRequestController)
    )
    app.get(
        route + '/adopt',
        auth.authenticate,
        auth.authorize,
        catchAsync(controllers.getAdoptionRequestsController)
    )
    app.get(
        route + '/adopt/user/:userId',
        auth.authenticate,
        auth.authorize,
        catchAsync(controllers.getAdoptionRequestsByUserIdController)
    )
}
