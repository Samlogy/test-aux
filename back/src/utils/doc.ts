import { Application } from 'express'
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cat Adoption System',
            version: '1.0.0',
            description: 'Cat Adoption System is a Node.js API for managing cat adoption: create, edit, delete, listing, adopting',
        },
        servers:[
            {url:'http://localhost:3001/api/v1'},
        ],
    },
    apis: ['./src/routes/*.route.ts', './src/docs/v1/*.yml'],
};

const getOptions = (version: string) => {
    return {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Cat Adoption System',
                version,
                description: 'Cat Adoption System is a Node.js API for managing cat adoption: create, edit, delete, listing, adopting',
            },
            servers:[
                {url:'http://localhost:3001/api/v'+version},
            ],
        },
        apis: ['./src/routes/*.route.ts', `./src/docs/v${version}/*.yml`],
    };
}





export default function (app: Application, version:string) {    
    const specsV1 = swaggerJsdoc(getOptions(version));
    const specsV2 = swaggerJsdoc(getOptions(version));

    app.use('/api/v1/doc', swaggerUi.serve, swaggerUi.setup(specsV1, {explorer: true})); 
    app.use('/api/v2/doc', swaggerUi.serve, swaggerUi.setup(specsV2, {explorer: true})); 
}
