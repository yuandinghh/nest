import { Controller, Get, Post, UseInterceptors, UploadedFile, Res, } from '@nestjs/common';
import { UploadService } from './upload.service';
import {
  FileInterceptor, FileFieldsInterceptor, //多文件上传
} from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from 'express';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file')) //file 为上传的文件名
  upload(@UploadedFile() file) {     //key : file   ,value : file.jpg    //console.log('file', file);
    console.log(file.filename)
    return {
      code: 0,
      data: {
        __v: 0,
        url: `http://localhost:3000/images/${file.filename}`,
        filename: file.filename,
        extname: file.originalname,
        _id: "64dd92139c298d584cb11871",
        createdAt: new Date().toLocaleDateString()
      },
      msg: "请求成功"
    }
  }
  //多文件上传
  @Post('multiple')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'background', maxCount: 1 },
  ]))

  multipleUpload(@UploadedFile() file) {
    console.log(file)
    return {
      code: 0,
      data: {
        __v: 0,
        url: "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/64dd92139c298d584cb11871.jpg",
        filename: "9.jpg",
        extname: ".jpg",
        _id: "64dd92139c298d584cb11871",
        createdAt: "2023-08-17T03:20:51.136Z"
      },
      msg: "请求成功"
    }
  }

/*
file {
fieldname: 'file',
originalname: '001Wd7Ptzy78MfPwFCJ55&690.jpg',
encoding: '7bit',
mimetype: 'image/jpeg',
destination: 'D:\\Vue\\nestjs\\nest\\dist\\images',
filename: '001Wd7Ptzy78MfPwFCJ55&690.jpg',
path: 'D:\\Vue\\nestjs\\nest\\dist\\images\\001Wd7Ptzy78MfPwFCJ55&690.jpg',
size: 188945
}
*/
@Get('export')
downLoad(@Res() res: Response) {
  const url = join(__dirname, '../images/1662894316133.png');
  // res
  // console.log(url)
  res.download(url);
  // return  true
}

@Get('stream') //流式下载
async down(@Res() res: Response) {
  const url = join(__dirname, '../images/123.jpg');
  const tarStream = new zip.Stream();
  await tarStream.addEntry(url);

  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename=xiaoman`);
  tarStream.pipe(res);
}

@Get()
findAll() {
  console.log('findAll');
  return this.uploadService.findAll();
}
}
