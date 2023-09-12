import { Controller, Get } from '@nestjs/common';

@Controller('girls')
export class GirlsController {
    @Get()
    getGirls(): any {
        return {
            code: 0,
            data: ['girls  翠花', '小红', '大丫'],
            msg: '请求女孩列表成功',
        };
    }
}
