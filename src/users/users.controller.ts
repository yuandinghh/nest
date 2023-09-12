import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Query, Request,Session } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//import session, {  } from 'express-session';

//import * as svgCaptcha from 'svg-captcha';
const svgCaptcha = require('svg-captcha');
//import { Cookie } from 'express-session';
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Get('code2') // 图片验证码接口
  serverget(@Req() req, @Res() res, @Session() session) {
    // 设置字母随机验证码相关属性
    let options = {
      size: 4, // 4个字母
      noise: 0, // 干扰线2条
      fontSize: 46, //文字大小
      width: 100, //宽度
      height: 40, //高度
      color: false, //  true, // 文字颜色
      background: '#999', // 背景颜色
      // 数字的时候，设置下面属性。最大，最小，加或者减    // mathMin: 1,  // mathMax: 30,  // mathOperator: "+",
    }; //这里可以分为字母和数字随机验证码和数字算数随机验证码,
    //如果想尝试数字算数随机验证码可以将下一行取消注释,将数字算数验证码解开注释即可
    let captcha = svgCaptcha.create(options); //字母和数字随机验证码
    console.log('session:' + JSON.stringify(session));
    // let captcha = svgCaptcha.createMathExpr(options) //数字算数随机验证码
    let { text, data } = captcha; //console.log(text,data);
    req.session.code = text; //存储验证码记录到session
    console.log('req.session.code:' + req.session.code);
    res.type('svg');
    res.send({ img: captcha.data, str: captcha.text });
  }

  @Post('create')
  createUser(@Req() req, @Body() body) {
    const authorization = req.get('authorization')

    // 或者您可以使用 req.headers
   // console.log("req.headers.authorization:"+req.headers.authorization)
    console.log("req.headers:" + JSON.stringify(req.headers))
    console.log("req.body:" + JSON.stringify(req.body))
    console.log("req.session:" + JSON.stringify(req.session))
   // console.log("req.rawHeaders:" + JSON.stringify(req.rawHeaders))
   console.log("slices:----"+req.headers.cookie.slice(0, req.headers.cookie.length))
    const cookie = req.headers.cookie;
    console.log("cookie:" + cookie) 
  //  res.json({ authorization })

    // console.log(req.rawHeaders[1]); //yuanding.session=s%3AqyVBcG_ZkkmUiOf3_rHYJGTk2fKtMaNS.p1Zr4spEJgKiEMHOG4JZb0sm0TxRXoSTeAGo1MlrQp4
    console.log('body.code:' + body.code);
    let code: string = req.session.code.toString();
    code = code.toLocaleUpperCase();
    let name: string = body.code.toString(); //    console.log('req.session.code:' + code);
    console.log('body.name:' + body.name + '---body.password:' + body.password);
    // if (req.session.code.toLocaleLowerCase() == body.code.toLocaleLowerCase()) {
    if (code === name) {
      return {
        message: '验证码正确',
      };
    } else {
      return {
        message: '验证码错误',
      };
    }
  }

  //27章 添加tages
  @Post('add/tags')
  addTags(@Body() params: { tags: string[]; userId: number }) {
    console.log('params:' + JSON.stringify(params) + "   Usecontraller");
    return this.userService.addTags(params);
  }
  
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('user---createUserDto:' + JSON.stringify(createUserDto));
    return this.userService.create(createUserDto);
  }

  @Get('get')
  findAll1(@Query() query: { keyWord: string; page: number; pageSize: number }) {
    console.log('query:' + JSON.stringify(query));
    return this.userService.findAll1(query);
  }

  @Get()    //浏览 翻页
  findAll(@Query() query: { keyWord: string; page: number; pageSize: number }) {
    console.log('query:' + JSON.stringify(query));
    return this.userService.findAll(query);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAllget();
  // }
  @Get('hello')
  getHello(@Request() req): any {
    console.log(req.query);
    //return this.appService.getHello();
    return 'Hello User ！';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }


  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }

  @Get('code') //无法返回校验码
  createCaptcha(@Req() req, @Res() res) {
    let captcha = svgCaptcha.create({
      //验证码   captcha 返回对象
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#058', //背景颜色
    });
    // return {    //   captcha,    // };
    req.session.code = captcha.text; //存储验证码记录到session
    res.type('image/svg+xml');
    console.log('captcha.text:' + captcha.text);
    res.send(captcha.data);
  }

}
