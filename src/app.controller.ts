import { Controller, Get ,Request} from '@nestjs/common';
import { AppService } from './app.service';
import { request } from 'node:http';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly usersService: UsersService,   
    ) {}
 //app 使用service 模块
  @Get()
  getHello(@Request() req): any {
    console.log(req.query)
    //return this.appService.getHello();
    return {
      code: 200,
      message: 'Hello',
      data: [10,30,40]

    }
  }
  @Get('xiao')
  getXiao(): string {
    return this.appService.getXiao();   //"this.appService.getHello()";
  }
  // @Get('user')   //http://localhost:3000/user
  // getuser(): string {
  //   return this.usersService.findAllget();   //findAll 要共享
  // }


}

