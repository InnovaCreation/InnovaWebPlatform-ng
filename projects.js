const _ = require('lodash');
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

    createProject(proj, parent = "") {
        let uuid = uuidv4()
        this.db.get('projects').set(uuid, proj).write()
        if (parent) {
            let p = this.db.get('projects').get(parent)
            if (!p) return undefined
            p.get('subProjects').push(uuid).write()
        }
        return uuid
    }

    deleteProject(uuid) {
        return this.db.get('projects').remove({ uuid: uuid }).write()
    }

    setProjectName(uuid, name) {
        let proj = this.db.get('projects').get(uuid)
        if (!proj) return undefined
        proj.set('projName', name).write()
        return proj
    }

    setProjectDesc(uuid, desc) {
        let proj = this.db.get('projects').get(uuid)
        if (!proj) return undefined
        proj.set('projDesc', desc).write()
        return proj
    }

    setProjectRepo(uuid, repo) {
        let proj = this.db.get('projects').get(uuid)
        if (!proj) return undefined
        proj.set('projRepo', repo).write()
        return proj
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

        server.route({
            method: 'POST',
            path: '/api/modifyProject',
            handler: (request) => {
                let payload = request.payload

                if (payload) {
                    if (!payload.projUUID) {
                        return { status: "failed", error: "Request doesn't contain projUUID field" }
                    }

                    let proj = undefined

                    if (payload.projName) {
                        proj = proj || this.setProjectName(payload.projUUID, payload.projName)
                    }
                    if (payload.projDesc) {
                        proj = proj || this.setProjectDesc(payload.projUUID, payload.projDesc)
                    }
                    if (payload.projRepo) {
                        proj = proj || this.setProjectRepo(payload.projUUID, payload.projRepo)
                    }

                    if (!proj) return { status: "failed", error: "Failed to modify project" }

                    return { status: "success" }
                }

                return { status: "failed", error: "Empty payload" }
            }
        })

        server.route({
            method: 'POST',
            path: '/api/deleteProject',
            handler: (request) => {
                let payload = request.payload

                if (payload) {
                    if (!payload.projUUID) {
                        return {
                            status: "failed", error: "Request doesn't contain proUUID field"
                        }
                    }

                    this.deleteProject(payload.projUUID)
                    return { status: "success" }
                }
                return { status: "failed", error: "Empty payload" }
            }
        })
    }
}

module.exports = Pm
