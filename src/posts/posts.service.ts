import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  HttpException,
  Injectable,
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { Posts } from './entities/Post.entity';
import { Repository, Like, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  Posts: any;
  constructor(
    @InjectRepository(Posts) private readonly posts: Repository<Posts>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    console.log('posts-createPostDto:' + JSON.stringify(createPostDto));
    //将createPostDto属性写入表posts
    const data = new Posts();
    const returns = await this.posts.save(createPostDto); //存储数据库 返回全部数据库记录
    return {
      code: 0,
      returns,
      msg: 'success',
    };
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
