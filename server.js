'use strict';

const Hapi = require('@hapi/hapi')
const Pm = require('./projects.js')
const Path = require('path');

let pm = new Pm("projectsDB.json");

const init = async () => {

    const server = Hapi.server({
        port: 1337,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.file('app.html')
        },
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                redirectToSlash: true
            }
        }
    });

    pm.createRoutes(server)

    await server.start()
    console.log('Server running on %s', server.info.uri)
};

process.on('unhandledRejection', (err) => {

    console.log(err)
    process.exit(1)
});

init();