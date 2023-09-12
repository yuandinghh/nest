import {  Controller, Inject, Get,  Post,    Request,  Query,  Body,  Param,  Headers,} from '@nestjs/common';
import { GirlService } from './girl.service';
// import { log } from 'console';
// import { clearConfigCache } from 'prettier';


// Get 要导入
@Controller('girl')
export class GirlController {  //构造函数 注入
  constructor( 
    @Inject('girl') private girlService:GirlService,
    @Inject('GirlArray') private girls:string[],
   //  private girlService: GirlService
     ) {}

  @Get('/test')
  test():string[]{
    return this.girls;
  } 
  // this.girlService = new GGirlService()
  // @Get()
  // getGirls(): any {
  // 控制逻辑和路由分开了
  // return this.girlService.getGirls();
  // return {
  //   code: 0,
  //   data: ['翠花', '小红', '大丫'],
  //   msg: '请求女孩列表成功',
  // };

  // @Post('/add')
  // addGirl(): any {
  //   return this.girlService.addGirl();
  // }
  @Get('/add')
  addGirl(@Body() body): any {
    console.log(body);
    return this.girlService.addGirl();
  }
  @Get('/delete/:id')
  deleteGirl(@Param() params): any {
    const id: number = parseInt(params.id)
    return this.girlService.delGirl(id);
  }
  @Get('/updategirl/:id')
  updateGirl(@Param() params): any {
    const id: number = parseInt(params.id);
    return this.girlService.updateGirl(id);
  }
  // 得到所有女孩
  @Get()
  getGirls(): any {
    return this.girlService.getGirls();
  }
  
  @Get('/findGirlByName/:name')
  findGirlByName(@Param() params): any {
    console.log(params.name)
    const name: string = params.name
    return this.girlService.getGirlByName(name)
  }
}

/*
 POST http://localhost:3000/girl/add

Content-Type: :application/json
{   
    "id": 1, "name": "小红", "age": 20 
}

GET  http://localhost:3000/girl/findGirlById/2/yyy
*/
