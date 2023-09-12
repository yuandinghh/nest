import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express'; //引入NestExpressApplication 静态目录
import { join } from 'path';
//import { RoleGuard } from './role.guard/role.guard.guard.ts';   //全局管道 gaurd
//import { RoleGuard } from './guard/role/role.guard';   //全局管道 gaurd
import { Response } from './common/response';   //异常拦截器
import { HttpFilter } from './common/filter';   //拦截器
import { RoleGuard } from './role.guard/role.guard.guard';

//import { Reflector } from '@nestjs/core';  //7-4 guard

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: '/images', //设置虚拟路径
  });
  // app.useStaticAssets(join(__dirname, 'public'),
  //   {
  //     prefix: '/public', //设置客户头像存取虚拟路径  
  //   });
  //, {   //静态目录 http://localhost:3000/public/1.jpg
  //全局前缀  app.setGlobalPrefix('yd');
  // app.useGlobalGuards(new RoleGuard()); //全局管道
  // app.useGlobalInterceptors(new Response());   //异常拦截器
  app.useGlobalPipes(new ValidationPipe()); //全局过滤器//whitelist: true,  // transform: true,
  /*  使用全局管道不能输出详细信息 HttpFilter implements ExceptionFilter {  //异常拦截器 导致的输出
  {    "data": "Bad Request Exception",    "time": 1689584508977,    "success": false,
    "path": "/login",    "status": 400}  */
  //app.useGlobalGuards(new RoleGuardGuard());   //全局管道 //todo 23-7-4 搞不定
  app.use(
    session({
      secret: 'XiaoMan', //生成服务端session 签名 可以理解为加密
      name: 'yuanding.session', //生成客户端cookie 的名字 默认 connect.sid
      rolling: true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)
      cookie: { maxAge: null }, //设置返回到前端 key 的属性，默认值为{ path: ‘/’, httpOnly: true, secure: false, maxAge: null }。
    }),
  );
  // console.log('session:-----------' + session);
  // const app = await NestFactory.create(AppModule);
  app.enableCors(); //下载独立的cors包解决跨域问题

  //app.useGlobalFilters(new HttpFilter()); //异常拦截器 如果加载影响 ValidationPipe 输出有效信息
  await app.listen(3000);
  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}
bootstrap();
