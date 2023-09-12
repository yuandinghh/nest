import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './entities/Login.entity';
import { JwtModule } from '@nestjs/jwt';
//import { AvatarService } from '../avatar/avatar.service';

const jwtConstants = {   //jwtConstants  jwt常量  密钥
  secret: 'secret',  //token密钥
};
@Module({
  imports: [TypeOrmModule.forFeature([Login]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600000s' },
    }),
],
  controllers: [LoginController],
 // providers: [LoginService, AvatarService],
  providers: [LoginService ],
  exports: [LoginService],
})
export class LoginModule {}
