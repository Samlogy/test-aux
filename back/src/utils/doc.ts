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
    apis: ['./src/routes/*.route.ts', './src/docs/*.yml'],
};


const specs = swaggerJsdoc(options);


export default function (app: Application) {
    app.use('/api/v1/doc/', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));    
}
