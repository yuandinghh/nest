import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! 袁丁你好';
  }
  getXiao(): string {
    return ' 袁丁你好,最骚';
  }
}

//业务逻辑
