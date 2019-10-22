'use strict';

// 导入模块
// 1. Hapi是我们使用的服务器框架
// 2. Pm是项目管理模块(Project Management)，提供项目数据库与相关的API
// 3. Path是node.js内建模块，用于路径处理
const Hapi = require('@hapi/hapi')
const Pm = require('./projects.js')
const Path = require('path');

// 创建一个项目管理模块的实例(pm)，并使用projectsDB.json文件作为数据库
let pm = new Pm("projectsDB.json");

// 服务器初始化函数init
// 根据Hapi的设计，该函数为并发函数(async)
const init = async () => {

    // ?????????(Hapi.server)
    // ????????localhost
    // ????????1337
    // ????????URL??http://localhost:1337/
    const server = Hapi.server({
        port: 1337,
        host: 'localhost',
        routes: {
            // ????????????????public???
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    });

    // ??@hapi/inert???????Hapi??????????????
    await server.register(require('@hapi/inert'));

    // ????????route: GET http://localhost:1337/
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.file('app.html')
        },
    });

    // ??????????route???inert?????
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

    // ???????????API route
    pm.createRoutes(server)

    // ???????
    await server.start()
    console.log('Server running on %s', server.info.uri)
};

// Hapi?????
process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
});

// ????????????????????init
init();