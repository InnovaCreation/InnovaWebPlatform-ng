# InnovaWebPlatform-ng
---

# 项目结构

## 后端：

使用Node.js + HAPI.js作为基础框架。在当前阶段使用lowdb（一个简单的JSON数据库），但数
据存储结构应当考虑到对更加通用的数据库（例如SQL或MongoDB）的支持。

后端提供API支持，前端可以使用后端提供的API提供和修改数据。为了简化，我们不会使用任何模
板渲染系统。

1. server.js包括基础框架支持
2. projects.js包括项目管理模块
3. kanban.js包括kanban模块

### API

#### 项目管理API
1. `GET /api/getProjects`
Return a list of projects in the JSON format. Each entry provides a instance of Project.

2. `POST /api/createProject`
Create a new project. The arguments are:
    - `projName` required
    - `projRepo` required
    - `projDesc` required
    - `projParent` when creating a subproject with parent uuid

3. `POST /api/modifyProject`
Modify an existing project. The arguments are:
    - `projUUID` required. The UUID of the project that is going to be modified
    - `projName` not required
    - `projDesc` not required
    - `projRepo` not required

4. `POST /api/deleteProject`
The API for delete an existing project. Call it with caution. The arguments are:
    - `projUUID` required. Doesn't need to be correct.

5. `GET /api/getTasks` (TODO)
The API for getting the array of uuid of tasks belongning to this project. The arguments are:
    - `projUUID` required

### KanBan API
1. `/api/getTask` (TODO)
2. `/api/createTask` (TODO)
3. `/api/modifyTask` (TODO)
4. `/api/deleteTask` (TODO)
4. `/api/getThread` (TODO)
5. `/api/newThread` (TODO)
6. `/api/modifyThread` (TODO)
7. `/api/deleteThread` (TODO)
8. `/api/assignUser2Task` (TODO)

## 前端：

使用Vue.js作为模板和渲染，使用Axio进行API调用，并使用UIKit作为排版组件。前端使用静态页
面，动态更新等支持通过Vue.js实现。静态页面在public文件夹下。

## 数据结构：

### 项目管理
1. project.js定义了每个项目的数据结构
    - projName: 项目名称
    - projRepo: 项目同步的Git Repo地址
    - projDesc: 项目简介
    - subProjects: 一个包含子项目/依赖项目的uuid的数组
2. 在projects.js中，所有项目实例被存储在一个名为projects的KeyMap中。此处key为uuid，
value为项目实例

#### 看板系统
1. kanban_task.js定义了每个看板任务的数据结构
    - taskTitle: 任务标题
    - taskPriority: 任务优先级
    - taskAssignment: 项目负责人员（数组），存储负责人员（用户）的uuid
    - taskStatus: 项目状态（e.g. 未完成，进行中）
    - rootThread: 该任务第一条帖子的uuid（也就是任务介绍帖）
2. thread.js定义了每个看板帖子的数据结构
    - contentType: 定义该帖子的类型
        - 如果类型为"string"，content是直接被存储的MarkDown的帖子内容
        - 如果类型为"file"，content是指向一个在同步Git Repo里的MarkDown文件。该文件
        会被作为该帖子的内容
    - content: 帖子内容
    - nextThread: 下一条帖子的UUID（链表结构）
3. 在kanban.js中，所有任务被存储在一个名为taks的KeyMap中。此处key为uuid，value为实例
4. 在kanban.js中，所有帖子会被存储在threads的KeyMap中。此处key为uuid，value为实例

#### 用户系统
1. TBD。可能会某种Hapi.js的第三方登录系统