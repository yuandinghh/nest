import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';// 
import { AppService } from './app.service';
import { GirlModule } from './girl/girl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GirlsModule } from './girls/girls.module';
import { UserModule } from './users/users.module';
import { AppController } from './app.controller';
import { TagsModule } from './tags/tags.module';
import { MangerModule } from './manger/manger.module'; //import { PModule } from './p/p.module';
import { LoginModule } from './login/login.module';
import { GuardModule } from './guard/guard.module';
import { UploadModule } from './upload/upload.module';
import { ListModule } from './list/list.module';
import { ColumnsModule } from './columns/columns.module';
import { ConfigModule } from './config.module';	 // 1. 引入 ConfigModule  module  模块
import { Logger } from './middleware/index';
import { AvatarModule } from './avatar/avatar.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库的连接地址host
      port: 3306, // 数据库的端口 3306
      username: 'root', // 连接账号
      password: 'admin123', // 连接密码
      database: 'mydb', // 连接的表名
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 允许重连次数
      synchronize: true, // 是否将实体同步到数据库
      autoLoadEntities: true, // 自动加载实体配置，forFeature()注册的每个实体都自己动加载
    }),
    GirlsModule,
    GirlModule,
    UserModule,
    TagsModule,
    MangerModule,
    LoginModule,
    GuardModule,
    UploadModule,
    ListModule,
    ColumnsModule, //ConfigModule， PModule,   // 2. 注册 ConfigModule
    ConfigModule.forRoot({
      path: '/YuaDing', //动态模块传递参数
    }), AvatarModule,
    //   AuthModule,     // 2. 注册 ConfigModule   .forRoot({ // 3. 调用 ConfigModule.forRoot() 方法
  ],
  controllers: [AppController],
  // controllers: [GirlController],
  providers: [AppService],
})
export class AppModule {}

/*  mysql 数据类型
int, tinyint, smallint, mediumint, bigint, float, double, dec, decimal, 
numeric, date, datetime, timestamp, time, year, char, varchar, nvarchar,
 text, tinytext, mediumtext, blob, longtext, tinyblob, mediumblob, longblob, 
 enum, json, binary, geometry, point, linestring, polygon, multipoint,
  multilinestring, multipolygon, geometrycollection

*/
