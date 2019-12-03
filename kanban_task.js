// JavaScript source code
// 定义 kanban 任务的数据结构

// taskTitle：任务标题
// taskPriority：任务优先级
// taskAssignment：项目负责人（磁盘），存储负责人（用户）的uuid
// taskStatus：项目状态（例如未完成，进行中）
// rootThread：该任务第一条帖子的uuid（也就是任务介绍帖）

let Task = class {
    constructor(taskTitle, taskPriority, taskAssignment, taskStatus, rootThread) {
        this.taskTitle = taskTitle
        this.taskPriority = taskPriority
        this.taskAssignment = taskAssignment
        this.taskStatus = taskStatus
        this.rootThread = rootThread
    }
}