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
    - rootThread: 该任务第一条帖子的uuid（也就是任务介绍帖）
2. thread.js定义了每个看板帖子的数据结构
    - contentType: 定义该帖子的类型
        - 如果类型为"string"，content是直接被存储的MarkDown的帖子内容
        - 如果类型为"file"，content是指向一个在同步Git Repo里的MarkDown文件。该文件
        会被作为该帖子的内容
    - content: 帖子内容
3. 在kanban.js中，所有任务被存储在一个名为taks的KeyMap中。此处key为uuid，value为实例
4. 在kanban.js中，所有不同阶段的项目（计划中、进行中、完成等）的项目的uuid会被存在不同
的数组中。
4. 在kanban.js中，所有帖子会被存储在threads的KeyMap中。此处key为uuid，value为实例

#### 用户系统
1. TBD。可能会某种Hapi.js的第三方登录系统