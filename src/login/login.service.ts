import { HttpException, Injectable, UnauthorizedException, } from '@nestjs/common';
import { CreateLoginDto, CreateLoginDtologin } from './dto/create-login.dto';
import { CreateAvatarDto } from '../avatar/dto/create-avatar.dto';
import { Login } from './entities/Login.entity';
//import { Avatar } from '../avatar/entities/avatar.entity'; //  ./entities/Login.entity';
import { Repository, Like, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
//import { CreateUserDto } from 'src/users/dto/create-user.dto';
//import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
//import { AvatarService } from '../avatar/avatar.service'; //注册
//import { Avatar } from 'src/avatar/entities/avatar.entity';

@Injectable()
export class LoginService {
  Login: any;
  //Avatar: any;
  constructor(
    @InjectRepository(Login) private readonly login: Repository<Login>,
    // @InjectRepository(Avatar) private readonly avatar: Repository<Avatar>,
    // @Inject('UsersService') private UsersService: User.Service
    private jwtService: JwtService,
    //  private avatarService: AvatarService,
  ) { }
  // @Injectable()
  // export class AuthService {
  //   constructor(   private usersService: UsersService, private jwtService: JwtService,  ) { }
  create(createLoginDto: CreateLoginDto) {     //
    console.log('createLoginDto:' + JSON.stringify(createLoginDto));
    return '通过了验证  This action adds a new login';
  }

  async findSignup(createUserDtologin: CreateLoginDtologin) {  //注册
    //  console.log( 'server--CreateLoginDtologin:' + JSON.stringify(createUserDtologin) +  '~~~' +        createUserDtologin.email,    );
    const data = new Login(); //console.log("data:::::::::::" + JSON.stringify(data));
    const findemail = await this.login.find({
      where: {
        email: Like(`${createUserDtologin.email}`), //没有%号 匹配查询
      },
    }); // console.log('server--findemail:' + JSON.stringify(findemail));
    if (findemail.length > 0) {
      console.log('findemail:' + JSON.stringify(findemail) + '  邮箱已经存在');
      return {
        code: 2,
        msg: '邮箱已经存在',
      };
    } // console.log('server-JSON-findemail:' + JSON.stringify(findemail), 'findemail:' + findemail);
    const uuid = require('node-uuid');
    const moment = require('moment');
    const timenow = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    data.email = createUserDtologin.email;
    data.password = createUserDtologin.password;
    data.nickName = createUserDtologin.nickName;
    data.column = uuid.v4(); //    console.log('uuid:' + data.uuid);   // v1 根据时间戳和随机数生成的uuid
    data.url = 'http://localhost:3000/images/avatar.jpg';
    data.description = "";
    data.createTime = timenow;
    //   console.log('set data:' + JSON.stringify(data));
    const returns = await this.login.save(data); //存储数据库 返回全部数据库记录
    const payload = { sub: returns.id, username: createUserDtologin.email };
    if (returns) {      //存储数据表成功，创建avater
      //  const returnavatar = this.avatarService.signavatar(avatardata);
      return {
        code: 0,
        data: {
          _id: returns.id,
          email: returns.email,
          nickName: returns.nickName,
          column: returns.column,
          avatar: {
            _id: returns.column,
            url: returns.url,
            description: '',
          }
        },
        token: await this.jwtService.signAsync(payload), //返回token
        msg: '请求成功',
      };
    } else {
      return {
        code: 1,
        msg: '注册失败,数据库错误',
      };
    }
  }

  //  private async findOneById(email:string ): Promise<Login> {
  //     const catInfo = await this.login.findOne(email );
  //     console.log('catInfo:' + JSON.stringify(catInfo));
  //     if (!catInfo) {
  //         throw new HttpException(`指定 id=${email} 的猫猫不存在`, 404);
  //     }
  //     return catInfo;
  // }
  // async findEmail(createUserDtologin: CreateLoginDtologin) {   //注册  FindOneOptions<Login>
  async loginin(createUserDtologin: CreateLoginDtologin) {    //登录  通过邮箱和密码
    //  console.log('server loginin--CreateLoginDtologin:' + JSON.stringify(createUserDtologin) + '~~~' + createUserDtologin.email,    );
    const data1 = await this.login.find({
      where: {
        email: Like(`${createUserDtologin.email}`),
      },
      order: {
        id: 'DESC',
      },
      // skip: (query.page - 1)* query.pageSize,      // take:query.pageSize,
    }); // const total = await this.user.count({  //  where: {    //     name: Like(`%${query.keyWord}%`)    //   },    // })    // console.log('data1:' + JSON.stringify(data1));
    if (data1.length > 0) {
      if (data1[0].password == createUserDtologin.password) {
        const token = await this.jwtService.signAsync({
          id: data1[0].id,
          username: createUserDtologin.email,
        });
        //    const payload = { sub: data1[0].id, username: createUserDtologin.email };
        const data = data1[0]; //console.log('data-----:' + JSON.stringify(data));
        return {
          code: 0,
          data: {
            _id: data.id,
            email: data.email,
            nickName: data.nickName,
            column: data.column,
            avatar: {
              _id: data.column,
              url: data.url,
              description: '',
            },
          },
          token, // await this.jwtService.signAsync(payload),  //返回token
          msg: '请求成功', //   total
        }

      } else {
        return {
          code: 1,
          msg: '密码错误 ！重新输入。',
        };
      }
    } //else {
    return {
      code: 2,
      msg: '邮箱不存在 ！重新输入或注册。',
    };    // }
  }
}
// export interface ImageProps {
//   _id: string;
//   url?: string;
//   createdAt: string;
//  // fitUrl: string;
//   description: string;
// }

/* {"code":0,"data":{"_id":"643304ec9c298d584cb1125c","email":"110959751@qq.com","nickName":"yd","column":"643304ec9c298d584cb1125d",
"avatar":{"_id":"64dcf23e9c298d584cb1186e","url":"http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/.jpg"},
"description":"喜欢已经哲也的程序，edit"},"msg":"请求成功"}
*/
//   findAll() {
//       return `This action returns all login`;
//     }
//   findOne(id: number) {
//       return `This action returns a #${id} login`;
//     }
//   update(id: number, updateLoginDto: UpdateLoginDto) {
//       return `This action updates a #${id} login`;
//     }
//   remove(id: number) {
//       return `This action removes a #${id} login`;
//     }
// }

// async findOneById(email: string): Promise<Cat> {    //       return this.findOneById(createUserDtologin.email);
