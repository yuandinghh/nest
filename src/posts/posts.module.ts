import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/Post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts])
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
