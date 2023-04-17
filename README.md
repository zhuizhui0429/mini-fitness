# mini-fitness
自己的毕业设计作品，是一款用于记录健身的微信小程序。

**功能包括**：体重管理/饮食记录/健身计划创建等等

## 技术栈

前端：Taro-cli + React + TypeScript + Scss + taro-ui

后端: Nest-cli + typeorm + mysql + Typescript

## 启动项目流程

前端项目:fitness-front

- npm i 安装依赖
- npm run dev:weapp 进行编译打包成原生微信小程序的代码格式
- 打开微信开发者工具导入刚刚打包好的dist文件目录

后端项目: fitness-backend

- npm i 安装依赖
- npm run start:dev 启动服务

后端项目启动后可以通过localhost:3000/api-docs查看swagger在线接口测试文档。
