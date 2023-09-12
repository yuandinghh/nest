import { Module } from '@nestjs/common';
import { GirlsController } from './girls.controller';

@Module({
  controllers: [GirlsController],
})
export class GirlsModule {}
