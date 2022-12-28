import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'HomerUI',
        description: '',
        version: '1.0.0',
    },
    host: 'localhost:5353',
    basePath: '/api/',
    tags: [        // by default: empty Array
      {
        name: 'Authentication',
        description: 'This endpoint is used to authenticate users, it generates a JWT token that is used to access other endpoints after being passed a Username and Password.'
      },
      {
        name: 'Service',
        description: 'This endpoint is used to manage services, it allows you to create, read, update and delete services.'
      }
    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    },
    definitions: {
        User: {
            username: 'string',
            password: 'string'
        },
        UserResponse: {
            user: {
                id: 'number',
                username: 'string',
                name: 'string',
                public_front: 'boolean',
                settings_id: 'number',
            },
            token: 'string'
        },
        Service: {
            groupId: 'number',
            name: 'string',
            subtitle: 'string',
            appId: 'string',
            logo: 'string',
            url: 'string',
            endpoint: 'string',
            license: 'string',
            description: 'string',
            enhanced: 'boolean',
            type: 'string',
            tag: 'string'
        },
        ServiceResponse: {
            id: 'number',
            service: {
                groupId: 'number',
                name: 'string',
                subtitle: 'string',
                appId: 'string',
                logo: 'string',
                url: 'string',
                endpoint: 'string',
                license: 'string',
                description: 'string',
                enhanced: 'boolean',
                type: 'string',
                tag: 'string'
            }
        },
        ServicesResponse: [
            {
                groupId: 'number',
                name: 'string',
                subtitle: 'string',
                appId: 'string',
                logo: 'string',
                url: 'string',
                endpoint: 'string',
                license: 'string',
                description: 'string',
                enhanced: 'boolean',
                type: 'string',
                tag: 'string'
            }
        ]
    },
    components: {}
};

const outputFile = '../swagger.json';
const endpointsFiles = ['../routes/api.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc).then(async () => {
    await import('../main');
});