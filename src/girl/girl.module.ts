import { Module } from '@nestjs/common';
import { GirlController } from './girl.controller';
import { GirlService } from './girl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Girl } from './girl.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Girl])],
  controllers: [GirlController],
  providers: [GirlService,
  {
    provide:"girl",
    useClass:GirlService
  },{
    provide:"GirlArray",
    useValue:['小红','小翠','大鸭']
  }],
})
export class GirlModule {}
