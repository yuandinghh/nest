import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ParseUUIDPipe } from '@nestjs/common';
// ValidationPipe;   验证管道
// ParseIntPipe;  转换为整数
// ParseFloatPipe; 转换为浮点数
// ParseBoolPipe;  转换为布尔值
// ParseArrayPipe; 转换为数组
// ParseUUIDPipe; 转换为UUID
// ParseEnumPipe; 转换为枚举
// DefaultValuePipe; 设置默认值

import { PService } from './p.service';
import { CreatePDto } from './dto/create-p.dto';
import { UpdatePDto } from './dto/update-p.dto';
import { UUID } from 'crypto';
import * as  uuid from 'uuid';

//console.log(uuid.v4(), '=====================');   //v4版本的uuid 常用

@Controller('p')
export class PController {
  constructor(private readonly pService: PService) {}

  @Post()
  create(@Body() createPDto: CreatePDto) {
    return this.pService.create(createPDto);
  }

  @Get()
  findAll() {
    return this.pService.findAll();
  }

  @Get(':id')
  // findOne(@Param('id') id: string) {
   findOne(@Param('id', ParseIntPipe) id: number) {  //将ID转换为数字
 // findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    //将ID转换为UUID  http://localhost:4000/api/p/0ef7653f-6686-42f5-8c90-59ebad09fe9a 通过
    //将ID转换为数字
    console.log(typeof id, '==============='); //string
    return this.pService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePDto: UpdatePDto) {
    return this.pService.update(+id, updatePDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pService.remove(+id);
  }
}
