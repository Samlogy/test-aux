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
        route,
        catchAsync(controllers.filtersCatsController)
    )
    app.get(
        route + "/:id",
        catchAsync(controllers.getCatDetailsById)
    )
    app.post(
        route + '/favorite/:catId/user/:userId',
        // auth.authenticate,
        catchAsync(controllers.setFavoriteCatController)
    )
    app.get(
        route + '/favorite/:catId/user/:userId',
        // auth.authenticate,
        catchAsync(controllers.getFavoriteCatController)
    )
    app.get(
        route + '/popularity/:catId',
        // auth.authenticate,
        // auth.authorize,
        catchAsync(controllers.getCatPopularityController)
    )

    app.post(
        route,
        // auth.authenticate,
        // auth.authorize,
        upload.single('image'),
        validate(validationSchema.postCatSchema),
        catchAsync(controllers.postCatController)
    )
    app.put(
        route + '/:id',
        // auth.authenticate,
        // auth.authorize,
        upload.single('image'),
        catchAsync(controllers.putCatByIdController)
    )
    app.delete(
        route + '/:id',
        // auth.authenticate,
        // auth.authorize,
        catchAsync(controllers.deleteCatByIdController)
    )

 
    app.get(
        route + '/adopt/:catId',
        // auth.authenticate,
        // auth.authorize,
        catchAsync(controllers.getAdoptionRequestsController)
    )
    app.post(
        route + '/adopt',
        // auth.authenticate,
        // auth.authorize,
        catchAsync(controllers.createAdoptionRequestController)
    )
    app.get(
        route + '/adopt/:catId/user/:userId',
        // auth.authenticate,
        // auth.authorize,
        catchAsync(controllers.acceptAdoptionRequestController)
    )
    app.delete(
        route + '/adopt/:catId/user/:userId',
        // auth.authenticate,
        // auth.authorize,
        catchAsync(controllers.denyAdoptionRequestController)
    )
}
