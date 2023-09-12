import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';   //class-validator 校验器的使用
//export class CreatePDto {
export class CreateLoginDtologin {
  //id: number = 0
  @IsEmail({
    allow_display_name: false,
     }) //验证是否为邮箱格式'}))
  @IsNotEmpty( {     message: '邮箱不能为空',  } ) 
  email: string;
  password: string;
  nickName: string;
}

export class CreateLoginDto { 
  @IsNotEmpty({message: '姓名不能为空'}) //验证是否为空
  @IsString({
    message: '姓名必须为字符串',
  }) //是否为字符串
  @Length(5, 10, { message: '用户名长度不对,应该大于等于5，小于等于10' }) //长度限制
  name: string;

  @IsNotEmpty({
   message: '年龄不能为空',
  })
  @IsNumber({   //   message: '年龄必须为数字',
    allowNaN: false,
  })
  age: number;
}
/*
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
*/

//npm i --save class-validator class-transformer    安装验证器
//npm i --save @nestjs/swagger swagger-ui-express    安装swagger
//npm i --save-dev @types/swagger-ui-express
/*IsOptional() 选填字段校验,如果是选填的，需要再加上另外校验
@IsOptional()
  @MinLength(1)
  namespace: string;

@IsArray() 是数组类型
// 是数组类型，且数组长度最小为1
  @ArrayMinSize(1)
  @IsString({each:true})
  codes: string[];

  @IsObject 是对象类型
尽量不是用 any 而是具体到各种 类型
  // 对于键值对的类型直接使用
  @IsObject()
  value : KeyValuePair // 引用的是 common/types

IsEnum 枚举类型
  @IsEnum(targetType)
  type: targetType;

*/