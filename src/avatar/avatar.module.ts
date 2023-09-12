import { Module } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { AvatarController } from './avatar.controller';
import { Avatar } from  '../avatar/entities/avatar.entity' 
import { TypeOrmModule } from '@nestjs/typeorm';
//import { LoginService } from 'src/login/login.service';

@Module({
  imports: [TypeOrmModule.forFeature([Avatar])],
  controllers: [AvatarController],
  //providers: [AvatarService, LoginService],
  providers: [AvatarService],
  exports: [AvatarService, AvatarModule]
})
export class AvatarModule {}
