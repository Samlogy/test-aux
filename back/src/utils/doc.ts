import { Request, Response, NextFunction, Application } from 'express';
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = (v:string) => {
    return {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Cat Adoption System',
                version: v,
                description: 'Cat Adoption System is a Node.js API for managing cat adoption: create, edit, delete, listing, adopting',
            },
            servers:[
                {url:'http://localhost:3001/api/'+v},
            ],
        },
        apis: ['./src/routes/*.route.ts', `./src/docs/${v}/*.yml`],
    }
};

export default function (app: Application) {

    
    app.use('/api-docs', (req: any, res: Response, next: NextFunction) => {
        // const version = req.apiVersion;
    
       
    
        // if (version === 'v2') {
        //     swaggerUi.serve(req, res, next);
        //     swaggerUi.setup(swaggerJsdoc(options(version)), { explorer: true })(req, res, next);
        // } else {
        //     app.get('/', swaggerUi.serve,
        //     swaggerUi.setup(swaggerJsdoc(options(version)), { explorer: true }))
        // }

        console.log(req.path)
    });
}

