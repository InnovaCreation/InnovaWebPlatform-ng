const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const Project = require('./project.js')

let Pm = class {
    constructor(projDBFile) {
        this.file = projDBFile
        this.adapter = new FileSync('db.json')
        this.db = low(this.adapter)

        this.db.defaults({ projects: [] }).write()
    }

    createProject(proj) {
        this.db.get('projects')
               .push(proj)
               .write()
    }

    getProjects() {
        return this.db.get('projects')
    }

    createProjectHandler(request) {
        console.log("Received POST from " + request.payload.name + "; id=" + (request.payload.id || 'anon'));

        if (request.payload.uploadFile) {
            const byteLength = Buffer.byteLength(request.payload.uploadFile);
            console.log('Persist Buffer here. Size=' + byteLength);
        }

        return {greeting: 'POST hello to ' + request.payload.name}
    }

    createRoutes(server) {
        server.route({
            method: 'GET',
            path: '/api/getProjects',
            handler: (request, h) => {
                return JSON.stringify(this.getProjects())
            },
        });

        server.route({
            method: 'POST',
            path: '/api/createProject',
            handler: this.createProjectHandler
        })
    }
}

module.exports = Pm