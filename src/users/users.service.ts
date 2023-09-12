import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
//import { Tags } from './entities/tags.entity';
import { Tags } from '../tags/entities/tag.entity';

@Injectable()
export class UsersService {
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Tags) private readonly tag: Repository<Tags>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const data = new User();
    console.log('User-server--createUserDto:' + JSON.stringify(createUserDto)	);
    data.name = createUserDto.name;
    data.desc = createUserDto.desc;
    console.log('serve_data:' + JSON.stringify(data));
    return this.user.save(data);
  }
  
    async findAll(query: { keyWord: string; page: number; pageSize: number }) {
      const data = await this.user.find({
        where: {
          name: Like(`%${query.keyWord}%`),
        },
        order: {
          id: 'DESC',
        },
        skip: (query.page - 1) * query.pageSize,
        take: query.pageSize,
      });

      const total = await this.user.count({
        where: {
          name: Like(`%${query.keyWord}%`),
        },
      });
      return {
        data,
        total,
      };
    }

  // //27章 添加tages
  // async addTags(params: { tags: string[]; userId: number }) {
  //  //  const user = await this.user.findOne(params.userId);
  //   // const { tags, userId } = params;
  //   // const user = await this.user.findOne(userId);
  //   // user.tags = tags;
  //   const userInfo = await  this.user.findOne({where:(id:params.userId)});
  //   return this.user.save(user);
  // }

  //通过前端传入的userId 查到当前id 的用户信息，然后拿到前端传入的tags [tag1,tag2,tag3]
  // 进行遍历 给tag实例进行赋值 然后调用保存方法添加tag 添加完之后 通过 tagList 保存该tag类
  // 最后把tagList 赋给 user类的tags属性 然后重新调用save 进行更新
  async addTags(params: { tags: string[]; userId: number }) {
  //  console.log('params:' + params);
    const userInfo = await this.user.findOne({ where: { id: params.userId } });
    console.log('userInfo:' + userInfo);
    const tagList: Tags[] = [];
    for (let i = 0; i < params.tags.length; i++) {
      let T = new Tags();
      T.tags = params.tags[i];
      await this.tag.save(T);
      tagList.push(T);
    }
    userInfo.tags = tagList;
    console.log(userInfo, 1);
    return this.user.save(userInfo);
  }

  async findAll1(query: { keyWord: string; page: number; pageSize: number }) {
    const data = await this.user.find({
      //查询的时候如果需要联合查询需要增加 relations
      relations: ['tags'],
      where: {
        name: Like(`%${query.keyWord}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.user.count({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
    });
    return {
      data,
      total,
    };
  }

  //原文链接：https://blog.csdn.net/qq1195566313/article/details/128379605
  // findAll() { //   return `This action returns all users`;  // }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }

  findAllget() {
    return `User GET This action appContrall 调用 all Users`;
  }

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
