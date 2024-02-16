const { version } = require('../package.json')

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'CAT API',
        version,
        description: 'CAT API',
        license: {
            name: 'MIT',
        },
        contact: {
            name: 'CAT API',
        },
    },
}

module.exports = swaggerDefinition
