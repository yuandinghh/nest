import { Controller, Get, Post, Body, Patch, Param, Delete ,UseGuards,SetMetadata,Req} from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
//import { RoleGuard } from  './role/role.guard';    // 单独使用
import { RoleGuard } from  '../role.guard/role.guard.guard';    // 也可以引入其他目录的 role.guard.guard.ts
//import { RoleGuard } from './role/role.guard';    // 单独使用
@Controller('guard')
@UseGuards(RoleGuard)
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  @SetMetadata('role', ['admin'])  //  role == admin 相等才能通过，否则返回false
  /*  如果设置SetMetadata('role', ['admin'])，role != admin- 返回:
  {
    "data": "Forbidden resource",
    "time": 1688490598690,
    "success": false,
    "path": "/guard?role=admin1",
    "status": 403
}   403 Forbidden是HTTP协议中的一个状态码（Status Code）。可以简单的理解为没有权限访问此站。该状态表示服务器理解了本次请求但是拒绝执行该任务，该请求不该重发给服务器。
  */ 
  findAll(@Body() createGuardDto: CreateGuardDto,@Req() req) {
    //console.log('GuardController---createGuardDto:'+JSON.stringify(createGuardDto)+'req:'+req);//7-4
   // console.log('GuardController---createGuardDto:'+JSON.stringify(createGuardDto));//7-4
    return this.guardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
function req(): (target: GuardController, propertyKey: "findAll", parameterIndex: 1) => void {
  throw new Error('Function not implemented.');
}

