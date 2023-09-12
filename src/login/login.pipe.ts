import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateLoginDto, CreateLoginDtologin } from './dto/create-login.dto';
import { plainToInstance } from 'class-transformer'; //验证器 实例化
import { validate } from 'class-validator';

@Injectable() //依赖注入 本类完成过滤器的功能，可以用全局管道代替
export class LoginPipe implements PipeTransform {
  //管道 // console.log('PipeTransform login.pipe:');
  async transform(value: any, metadata: ArgumentMetadata) {     //metadata: ArgumentMetadata  元数据
    console.log('PipeTransform login.pipe LoginPipe:', value, metadata);
    const DTO = plainToInstance(metadata.metatype, value); //验证器
    console.log('PipeTransform login.pipe DTO:', DTO);
    // await validate(DTO).then(errors => {
    //   if (errors.length > 0) {
    //     return DTO;
    //   }  else {
    //     console.log('PipeTransform login.pipe errors:', errors);
    //    // throw new Error('Validation failed');
    //     throw new HttpException(errors, HttpStatus.BAD_REQUEST); //抛出异常 HttpStatus.BAD_REQUEST 枚举 400
    //   }
    // });

    const errors = await validate(DTO);
    console.log('PipeTransform login.pipe errors:', errors);

    // if (errors.length == 0) {
    //   throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    // }
    return DTO;
  }
}

//为管道确定规则
// Compare this snippet from src\login\login\login.pipe.ts:
//value:  { name: 'xdan', age: 20 } { metatype: [class CreateLoginDto], type: 'body', data: undefined }
