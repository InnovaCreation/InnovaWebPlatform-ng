const _ = require('lodash');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const Project = require('./project.js')
const uuidv4 = require('uuid/v4')

function findProjByUUID(root, id) {
    console.log(root)
    if (!root) return undefined
    if (root.get(id)) return root.get(id)
    root.forEach(root, (p) => {
        let result = findProjByUUID(p.subProjects, id)
        if (result) return result
    })
}

let Pm = class {
    constructor(projDBFile) {
        this.file = projDBFile
        this.adapter = new FileSync(this.file)
        this.db = low(this.adapter)

        this.db.defaults({ projects: {} }).write()
    }

    createProject(proj, parent = "") {
        let root = this.db.get('projects')
        let uuid = uuidv4()
        if (parent) {
            let result = findProjByUUID(root, parent)
            if (!result) return undefined
            result.get('subProjects').set(uuid, proj).write()
        } else {
            root.set(uuid, proj).write()
        }
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
                    let uuid = this.createProject(proj, payload.projParent)

                    if (!uuid) return { status: "failed", error: "Failed to create project" }

                    return { status: "success", objectUUID: uuid }
                }

                return { status: "failed", error: "Empty payload" }
            }
        })
    }
}

module.exports = Pm