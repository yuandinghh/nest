import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Tags } from  '../tags/entities/tag.entity'      
import { Logger  } from '../middleware/index' 


// import { example } from './entities/tags.entity'; Logger
@Module({
  imports: [TypeOrmModule.forFeature([User, Tags])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
 export class UserModule {}

// export class UserModule implements NestModule {   //user 彻底被拦截
//   configure(consumer: MiddlewareConsumer) {   // 1. 通过 configure() 方法注册中间件,consumer消费者
//     consumer.apply(Logger).forRoutes('user')   //user 被拦截的路由
//   }
// }

// import { Module } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';

// @Module({
//   controllers: [UsersController],
//   providers: [UsersService]
// })
// export class UsersModule {}

// import { Module } from '@nestjs/common';
// import { UsersController } from   './users.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
// import { UsersService } from './users.service';
// @Module({
//   imports: [TypeOrmModule.forFeature([User])],
//   controllers: [UsersController],
//   providers: [UsersService],
// })
// export class UserModule {}