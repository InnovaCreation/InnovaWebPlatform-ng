// JavaScript source code
// 定义 kanban 帖子的数据结构

// contentType = string or file 定义帖子类型
// nextThread ：下一条帖子的UUID

let Thread = class {
    constructor(contentType, nextThread) {
        this.contentType = contentType
        this.nextThread = nextThread
    }
}