// import { Module } from '@nestjs/common';
// import { UploadService } from './upload.service';
// import { UploadController } from './upload.controller';
// @Module({
//   controllers: [UploadController],
//   providers: [UploadService]
// })
// export class UploadModule {}
import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { url } from 'inspector';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../images'),

        filename: (_, file, callback) => {
          let str = Math.ceil(Math.random() * 999);  // Math.random()*999 +1 //随机数;
          let strr: string = str.toString();
          const fileName = `${new Date().getTime() + strr + extname(file.originalname)}`;   //改变名字
           return   callback(null, fileName);
          // return {
          //   "code": 0,
          //   "data": {
          //     "__v": 0,
          //     "url": "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/64dd92139c298d584cb11871.jpg",
          //     "filename": "9.jpg",
          //     "extname": ".jpg",
          //     "_id": "64dd92139c298d584cb11871",
          //     "createdAt": "2023-08-17T03:20:51.136Z"
          //   },
          //   "msg": "请求成功"
          // }
        }
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule { }
