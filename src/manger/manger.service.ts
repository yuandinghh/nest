import { Injectable } from '@nestjs/common';
// import { CreateMangerDto } from './dto/create-manger.dto';
// import { UpdateMangerDto } from './dto/update-manger.dto';
import { CreateMangerDto, transferMoneyDto } from './dto/create-manger.dto';
import { UpdateMangerDto } from './dto/update-manger.dto';
import { Manger } from './entities/manger.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

@Injectable()
export class MangerService {
  constructor(
    @InjectRepository(Manger) private readonly money: Repository<Manger>,
  ) { console.log('money:' + money);  }
  create(createMangerDto: CreateMangerDto) {
    return 'This action adds a new manger';
  }

  async transferMoney(transferMoneyDto: transferMoneyDto) {  //输入的参数 transferMoneyDto
   // console.log('transferMoneyDto:' + JSON.stringify(transferMoneyDto));
    //return  {"name":"yd","age":18} //this.manger.save(transferMoneyDto);
    try {
      //typeOrm 事务
      return await this.money.manager.transaction(async (manager) => {
      //  console.log('MangerService constructor' + manager.count);   //JSON.stringify(
        const from = await this.money.findOne({  //获得数据库 money 表中的数据 id=transferMoneyDto.fromId 的数据
          where: { id: transferMoneyDto.fromId }, //条件select where 相对类 transferMoneyDto fromId 值
        });  //form 是数据库中的一行数据
        const to = await this.money.findOne({
          where: { id: transferMoneyDto.toId },
        });
        console.log('from, to:' + JSON.stringify(from), JSON.stringify(to));
        console.log(from.money >= transferMoneyDto.money);  
        if (from.money >= transferMoneyDto.money) {  //如果转账的钱小于等于发起人的钱,则转账成功
          manager.save(Manger, {  //保存到数据库
            id: transferMoneyDto.fromId,
            money: from.money - transferMoneyDto.money,
          });
          manager.save(Manger, {  //保存到数据库
            id: transferMoneyDto.toId,
            money: to.money + transferMoneyDto.money,
          });
          return {
            message: '转账成功',
          };
        } else {
          return {
            message: '转账失败 余额不足',
          };
        }
      });
    } catch (e) {
      return {
        message: e,
      };
    }
  }

  findAll() {
    return `This action returns all manger`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manger`;
  }

  update(id: number, updateMangerDto: UpdateMangerDto) {
    return `This action updates a #${id} manger`;
  }

  remove(id: number) {
    return `This action removes a #${id} manger`;
  }
}
