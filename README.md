
```    javascript
  "start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js --watch",
  nest g module girls
 nest g controller girls --no-spec
 nest g service girl --no-spec
 
```

##  nest g res demo  // 完整安装一个增删改查 全部服务模块
## session 是服务器 为每个用户的浏览器创建的一个会话对象 这个session 会记录到 浏览器的 cookie 用来区分用户

安装uuid

# npm install uuid -S
# npm install @types/uuid -D

# npm install compressing   支持的压缩格式   zip、gzip、tar、taz

安装验证器
# npm i --save class-validator class-transformer
# 小满nestjs（第十三章 nestjs 上传图片-静态目录）

# 1.主要会用到两个包
multer   @nestjs/platform-express nestJs自带了
multer   @types/multer 这两个需要安装

# cnpm i multer -S
# npm install @types/multer -D
# nest g res upload    生产目录

在upload  Module 使用MulterModule register注册存放图片的目录
需要用到  multer 的  diskStorage 设置存放目录 extname 用来读取文件后缀 filename给文件重新命名

PS D:\Vue\nestjs\nest\src\login> nest -h
Usage: nest <command> [options]

Options:
  -v, --version                                   Output the current version.
  -h, --help                                      Output usage information.
Commands:
  new|n [options] [name]                          Generate Nest application.
  build [options] [app]                           Build Nest application.
  start [options] [app]                           Run Nest application.
  info|i                                          Display Nest project details.
  add [options] <library>                         Adds support for an external library to your project.
  generate|g [options] <schematic> [name] [path]  Generate a Nest element.
    Schematics available on @nestjs/schematics collection:
      ┌───────────────┬─────────────┬──────────────────────────────────────────────┐
      │ name          │ alias       │ description                                  │
      │ application   │ application │ Generate a new application workspace         │
      │ class         │ cl          │ Generate a new class                         │
      │ configuration │ config      │ Generate a CLI configuration file            │
      │ controller    │ co          │ Generate a controller declaration            │
      │ decorator     │ d           │ Generate a custom decorator                  │
      │ filter        │ f           │ Generate a filter declaration                │
      │ gateway       │ ga          │ Generate a gateway declaration               │
      │ guard         │ gu          │ Generate a guard declaration                 │
      │ interceptor   │ itc         │ Generate an interceptor declaration          │
      │ interface     │ itf         │ Generate an interface                        │
      │ library       │ lib         │ Generate a new library within a monorepo     │
      │ middleware    │ mi          │ Generate a middleware declaration            │
      │ module        │ mo          │ Generate a module declaration                │
      │ pipe          │ pi          │ Generate a pipe declaration                  │
      │ provider      │ pr          │ Generate a provider declaration              │
      │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
      │ resource      │ res         │ Generate a new CRUD resource                 │
      │ service       │ s           │ Generate a service declaration               │
      │ sub-app       │ app         │ Generate a new application within a monorepo │
      └───────────────┴─────────────┴──────────────────────────────────────────────┘

# 我们使用的是nestjs 默认框架express 他也支持express 的插件 所以我们就可以安装express的session
# npm i express-session --save

需要智能提示可以装一个声明依赖
# npm i @types/express-session -D

然后在main.ts 引入 通过app.use 注册session
import * as session from 'express-session'
app.use(session())

# 为NestJS增加热重载功能
 npm i --save-dev webpack-node-externals run-script-webpack-plugin webpack
.增加配置文件 安装完成后，我们需要在项目根目录下增加一个webpack-hmr.config.js的配置文件。有了文件后，再把下面的代码复制到文件

2023年05月09日 02时06分46秒
  @Post('/add/tags')   找不到 地址   @Post('add/tags')  搞了两个小时
[Nest] 13892  - 2023/05/09 01:59:46   ERROR [ExceptionsHandler] Field 'name' doesn't have a default value
QueryFailedError: Field 'name' doesn't have a default value
    at Query.onResult (D:\Vue\nestjs\nest\src\driver\mysql\MysqlQueryRunner.ts:222:33)

``` javascript
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }),
    ],
  };
};
```

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

### 在nestjs中预先存储图片可以通过使用`multer`中间件来实现。

首先，你需要安装`multer`和`@nestjs/platform-express`依赖。

```bash
npm install multer @nestjs/platform-express
```
然后，在你的NestJS应用的主模块（通常是`app.module.ts`）中，引入`MulterModule`并在`imports`数组中添加它。
```typescript
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // 设置上传文件的存储目录
    }),
  ],
})
export class AppModule {}
```

在控制器中，使用`@UploadedFile()`装饰器来获取上传的文件，并且使用`@Post()`装饰器将路由映射到一个POST请求的处理程序上。

```typescript
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file')) // 'file'是上传表单字段的名称
  uploadFile(@UploadedFile() file) {
    console.log(file); // 在控制台中打印上传的文件信息
    // 处理上传的文件
  }
}
```

使用`@UseInterceptors()`装饰器将`FileInterceptor`拦截器应用于POST请求处理程序。`FileInterceptor`拦截器将文件从请求中提取出来并将其作为参数传递给处理程序。

您可以通过访问`file`对象的属性来处理上传的文件，例如`file.filename`获取保存在服务器上的文件名。

这样，在发送POST请求到`/upload`路由时，上传的文件将被保存在`./uploads`目录下，并且文件信息将在控制台上打印出来。你可以根据你的需求进一步处理上传的文件。

### node获取当前时间并格式化
1，安装 moment模块
cnpm i moment --save
2，引入
var moment = require(‘moment’);
3，获取当前时间并格式化为年月日 时：分：秒
var time = moment(Date.now()).format(‘YYYY-MM-DD HH:mm:ss’)
console.log(time)
