import { Controller, Get, Post, Body, Patch, Param, Delete,Options,Request } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  create(@Body() createColumnDto: CreateColumnDto) {
    console.log("columns:"+createColumnDto);
    return {
      code: 0,
      data: {
        id: createColumnDto,
      },
      msg: '请求成功',
    };
  ///  return this.columnsService.create(createColumnDto);
  }
  @Post()
  createlist(@Body() createColumnDto: CreateColumnDto) {
    console.log("columns_list:" + createColumnDto);
    return {
      code: 0,
      data: {
        id: createColumnDto,
      },
      msg: '请求成功',
    };
    ///  return this.columnsService.create(createColumnDto);
  }
  @Get()
  findAll() {  //console.log("columns_list:" );
    return      {
      "code": 0, 
      "data": {
        "count": 11,
        "pageSize": 2, 
        "currentPage": 1,
          "list": [
            {
              "createdAt": "2020-08-2022:21:10",
              "__v": 0,
              "avatar": {
                "_id": "5f3e41a8b7d9c60b68cdd1ec",
                "url": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg"
              },
              "featured": true,
              "author": "5f3e86d62c56ee13bb830961",
              "description": "酒店售货机，酒店经营，共享经济，新零售，共享数据线，关注灵趣科技，了解更多",
              "title": "铺先生",
              "_id": "5f3e86d62c56ee13bb83096c",
              "key": 0
            },
            {
              "createdAt": "2020-08-2022:21:10",
              "__v": 0,
              "avatar": {
                "_id": "5f3e3a17c305b1070f455202",
                "url": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg"
              },
              "featured": true,
              "author": "5f3e86d62c56ee13bb830960",
              "description": "半吊子系统和程序狗，沉迷高端理论，日渐消瘦。",
              "title": "Vehicle攻城狮",
              "_id": "5f3e86d62c56ee13bb83096b",
              "key": 1
            },
            {
              "createdAt": "2020-08-2022:21:10",
              "avatar": {
                "_id": "6375e2a1fc0f930997b05251",
                "url": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/6375e2a1fc0f930997b05251.jpg"
              },
              "featured": true,
              "author": "5f2918ed59d0b03366c0f0ad",
              "description": "这是Akira的专栏",
              "title": "帅气专栏-废品回收",
              "_id": "5f4db92abb821789a5490ed3",
              "key": 2
            },],
      },
      "msg": "请求成功"
    }
     /* [
      {
        id: 1,
        title: 'test1的专栏',
        description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧, 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_150,w_150'
      },
      {
        id: 2,
        title: 'test2的专栏',
        description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      },
      {
        id: 3,
        title: 'test3的专栏',
        description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧'
        // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      },
      {
        id: 4,
        title: 'test4的专栏',
        description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      }
    ]
    */
    //this.columnsService.findAll();
  }

  @Get(':id/posts')
  findOne(@Param('id') id: string, @Body() request: Body) {
  //findOne(@Param('id') id: string, @Request() request: Request) {
   // console.log("columns_list:" + id + "  request:"+JSON.stringify(request));
    console.log("columns_list:" + id + "  Body:" + Body);
    return this.columnsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(+id, updateColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnsService.remove(+id);
  }
}
