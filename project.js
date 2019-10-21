let Project = class {
    constructor(projName, repo = "", desc = "") {
        this.projName = projName
        this.projRepo = repo
        this.projDesc = desc
    }
}

module.exports = Project