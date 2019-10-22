const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const Project = require('./project.js')
const uuidv4 = require('uuid/v4')

let Pm = class {
    constructor(projDBFile) {
        this.file = projDBFile
        this.adapter = new FileSync(this.file)
        this.db = low(this.adapter)

        this.db.defaults({ projects: {} }).write()
    }

    createProject(proj) {
        let uuid = uuidv4()
        this.db.get('projects').set(uuid, proj).write()
        return uuid
    }

    getProjects() {
        return this.db.get('projects')
    }

    createRoutes(server) {
        server.route({
            method: 'GET',
            path: '/api/getProjects',
            handler: (request, h) => {
                return this.getProjects()
            },
        });

        server.route({
            method: 'POST',
            path: '/api/createProject',
            handler: (request) => {
                let payload = request.payload

                if (payload) {
                    if (!payload.projName) {
                        return { status: "failed", error: "Request doesn't contain projName field" }
                    }
                    if (!payload.projRepo) {
                        return { status: "failed", error: "Request doesn't contain projRepo field" }
                    }
                    if (!payload.projDesc) {
                        return { status: "failed", error: "Request doesn't contain projDesc field" }
                    }
                    let proj = new Project(payload.projName, payload.projRepo, payload.projDesc)
                    let uuid = this.createProject(proj)

                    return { status: "success", objectUUID: uuid }
                }

                return { status: "failed", error: "Empty payload" }
            }
        })
    }
}

module.exports = Pm