import { Injectable, Get, Post } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Girl } from './girl.entity';

@Injectable()
export class GirlService {  // 依赖注入
  constructor(
    @InjectRepository(Girl) private readonly girl: Repository<Girl>,
  ) {}
  //增加一个女孩
  addGirl() {
    console.log('girl add recode');
    const data = new Girl();
    data.name = '大丫';
    data.age = 22;
    data.skill = '玩游戏，喜欢过金管家';
    return this.girl.save(data);
  }
  // 删除一个女孩
  delGirl(id: number) {
    return this.girl.delete(id);
  }
  //修改一个女孩
  updateGirl(id: number) {
    const data = new Girl();
    data.name = '王小丫';
    data.age = 19;
    return this.girl.update(id, data);
  }
  // 得到所有女孩
  getGirls() {
    return this.girl.find();
  }
  // 根据姓名查找一个女孩的信息
  getGirlByName(name: string) {
    return this.girl.find({
      where: {
        name: Like(`%${name}%`),
      }
    })
  }
  
  // @Get()
  // getGirls(): any {
  //   return {
  //     code: 0,
  //     data: ['server翠花', '小红', '大丫'],
  //     msg: '请求女孩列表成功',
  //   };
  // }
  // @Post('add')
  // addGirl() {
  //   return {
  //     code: 200,
  //     data: { id: 1, name: '大梨', age: 27 },
  //     msg: '女孩添加成功',
  //   };
  // }
  // // @Request('id')
  // getGirlById(id: number) {
  //   let reJson: any = {};
  //   switch (id) {
  //     case 1:
  //       reJson = { id: 1, name: '翠花', age: 18 };
  //       break;
  //     case 2:
  //       reJson = { id: 1, name: '小红', age: 20 };
  //       break;
  //     case 3:
  //       reJson = { id: 1, name: '大丫', age: 23 };
  //       break;
  //   }
  //   return reJson;
  // }
}
