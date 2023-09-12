import { Controller, Get, Post, Body, Req, Res, Query, Request, Inject } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto, CreateLoginDtologin } from './dto/create-login.dto';
// import { UpdateLoginDto } from './dto/update-login.dto';
// import { LoginPipe } from './login.pipe';
//import { AvatarService } from '../avatar/avatar.service'; //注册 要生成 avater 数据库对应的id  用到了 avatarService
//import { PPipe } from    './login.pipe'    //使用全局管道
//import { ValidationPipe } from '@nestjs/common';  //使用全局管道
//import { AvatarModule } from '../avatar/avatar.controller';
import { Avatar } from '../avatar/entities/avatar.entity';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService,
    //  @Inject('AvatarService')  private  avatarService: AvatarService,
    //  private  avatarService: AvatarService,
  ) { }

  @Get('a')
  avatar(@Query() query) {
    console.log('avatar---query:' + JSON.stringify(query));
    //    return this.avatarService.findAll();
  }

  @Post() // 先进入 login.pipe.ts @Body(LoginPipe)
  //createa(@Body(LoginPipe) createLoginDto: CreateLoginDto) {
  createa(@Body() createLoginDto: CreateLoginDto) {  //直接使用全局管道
    console.log('Login_Controller----------:', createLoginDto);
    return this.loginService.create(createLoginDto);
  }

  @Post('signup') //注册  要生成 avater 数据库对应的id  用到了 avatarService
  //findAll(@Query() query) {
  findEmail(@Body() query: { email: string; password: string; nickName: string },) {
    // console.log('query:' + JSON.stringify(query));
    return this.loginService.findSignup(query);
  }
  // @Post('signup')
  //   findEmail(@Body() createUserDtologin: CreateLoginDtologin) {
  //     // @Req() req,  JSON.stringify
  // // findEmail(@Res() res ,@Request() req  ) {
  //  // console.log('signup---res:' +  +'***********req:'+req);
  //   // const ress1 = JSON.stringify(res);
  //   // const ress = JSON.parse(ress1);
  //   // console.log('signup---res:' + ress1);
  //   console.log('signup---createUserDto:' + JSON.stringify(createUserDtologin));
  // //  const createUserDtologin = req.body;
  //   return this.loginService.findEmail(createUserDtologin);
  // }
  @Post('login') //登录
  loginin(@Body() query: { email: string; password: string; nickName: string },) {
    //  console.log('login---createUserDto:' + JSON.stringify(createUserDtologin));
    return this.loginService.loginin(query);
  }

  @Post('current') //登录 获取avater
  getcurrent(@Query() query: { email: string }) {
    console.log('current---query:' + JSON.stringify(query));
    return {
      code: 0,
      data: {
        name: 'admin',
      },
      msg: '成功登录',
    };
  }

  //loginin(@Body() createUserDtologin: CreateLoginDtologin) {
  @Get('current') //登录 获取avater
  current(@Req() req, @Res() res) {  // current(@Req() req, @Body() query: { email: string } ) {
    console.log('current---req:' + req); //      console.log('current---req:' + JSON.stringify(query));
    const headers = req.headers;  //    console.log('current---headers:' + JSON.stringify(req));
    const token = headers.authorization.split(' ')[1];
    console.log('current---token:' + token);
    const jwt = require('jsonwebtoken');  //    console.log('current---jwt:' + JSON.stringify(jwt));
    jwt.verify(token, 'secret', function (err: any, decoded: any) {  //
      if (err) {
        console.log('current---err:' + err);
        return {
          code: 1,
          msg: 'token失效',
        };
      } else {   //    console.log('current---decoded:' + decoded.username);

        res.json({ code: 0, data: decoded, msg: 'token有效' });  // same return data
        // return {     //   code: 0,      //   data:  decoded ,        //   msg: 'token有效',        // };
      }
    });
  }

  /*{  "name": "1111","age":20}
返回信息
{
    "statusCode": 400,
    "message": [
        "用户名长度不对,大于等于5，小于等于10"
    ],
    "error": "Bad Request"
}
如果手写管道，返回
PipeTransform login.pipe LoginPipe: { name: '', age: 20 } { metatype: [class CreateLoginDto], type: 'body', data: undefined }
PipeTransform login.pipe DTO: CreateLoginDto { name: '', age: 20 }
PipeTransform login.pipe errors: [
  ValidationError {
    target: CreateLoginDto { name: '', age: 20 },
    value: '',
    property: 'name',
    children: [],
    constraints: {
      isLength: '用户名长度不对,大于等于5，小于等于10',
      isNotEmpty: 'name should not be empty'
    }
  }
]
Login_Controller----------: { name: '', age: 20 }


  @Get()
  findAll() {
    console.log('Login_Controller----------:findAll');
    return this.loginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
  */
}
