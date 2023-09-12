import { Injectable } from '@nestjs/common';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { Avatar } from './entities/avatar.entity';
import { Repository, Like, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
//import { Login } from 'src/login/entities/Login.entity';
import { LoginService } from '../login/login.service';

@Injectable()
export class AvatarService {
  Avatar: any;
  constructor(
    @InjectRepository(Avatar) private readonly avatar: Repository<Avatar>,
 //   @InjectRepository(Login) private readonly login: Repository<Login>,
   // private avatarService: AvatarService,
  ) { }

  create(createAvatarDto: CreateAvatarDto) {
    return 'This action adds a new avatar';
  }

  async signavatar(ImageProps: UpdateAvatarDto) {
    const avatar = new Avatar();  
   // const avatar  = {...ImageProps};
    avatar._id = ImageProps._id;
    avatar.url = ImageProps.url;
    avatar.description = ImageProps.description;
    avatar.createTime = ImageProps.createTime;

    const returns = await this.Avatar.save(avatar); 
    console.log("returns:" + returns+  'avatar---ImageProps:' + JSON.stringify(ImageProps));
    return returns;
  }

  findAll() {
    console.log('avatarService---findAll');
    return ` Avatar This action returns all avatar`;
  }
  findOne(id: number) {
    return `This action returns a #${id} avatar`;
  }
  update(id: number, updateAvatarDto: UpdateAvatarDto) {
    return `This action updates a #${id} avatar`;
  }
  remove(id: number) {
    return `This action removes a #${id} avatar`;
  }
}
