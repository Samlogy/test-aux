import { Application } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
const swaggerDefinition = require('../docs/swagger')

const specs = swaggerJsdoc({
    swaggerDefinition,
    apis: ['docs/*.yml', 'routes/*.route.ts'],
})

export default function (route: string, app: Application) {
    app.use(route, swaggerUi.serve)
    app.get(
        route,
        swaggerUi.setup(specs, {
            explorer: true,
        })
    )
}
