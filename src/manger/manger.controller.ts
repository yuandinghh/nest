import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MangerService } from './manger.service';
import { CreateMangerDto, transferMoneyDto } from './dto/create-manger.dto';
import { UpdateMangerDto } from './dto/update-manger.dto';

@Controller('manger')
export class MangerController {
  constructor(private readonly mangerService: MangerService) {}
  
  //转账API
  @Post('/transferMoney')
  transferMoney(@Body() transferMoneyDto: transferMoneyDto) {
    console.log("contrall+transferMoneyDto:"+JSON.stringify(transferMoneyDto));
    return this.mangerService.transferMoney(transferMoneyDto);
  }
// 原文链接：https://blog.csdn.net/qq1195566313/article/details/130490664
  //创建人API
  @Post()
  create(@Body() createMangerDto: CreateMangerDto) {
    console.log(createMangerDto);
    return this.mangerService.create(createMangerDto);
  }

    @Get()
  findAll() {
    return this.mangerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mangerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMangerDto: UpdateMangerDto) {
    return this.mangerService.update(+id, updateMangerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mangerService.remove(+id);
  }
}
