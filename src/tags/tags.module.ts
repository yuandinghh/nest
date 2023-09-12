 import { TagsService } from './tags.service';
 import { TagsController } from './tags.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//import { UserService } from './users.service';
// import { UserController } from './users.controller';
// import { User } from './entities/users.entity';
// import { Tags } from './entities/tags.entity';
import { User } from '../users/entities/user.entity'    //'../users/entities/users.entity';
import { Tags } from  '../tags/entities/tag.entity'    //'entities/tags.entity';
// import { example } from './entities/tags.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Tags])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}

