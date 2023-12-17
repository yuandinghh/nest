import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
/*
新建文件夹 posts  发表文章
POST http://api.vikingship.xyz/api/posts HTTP/1.1
Host: api.vikingship.xyz
Connection: keep-alive
Content-Length: 175
Accept: application/json, text/plain, 
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
User - Agent: Mozilla / 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 117.0.0.0 Safari / 537.36 Edg / 117.0.2045.31
Content - Type: application / json; charset = UTF - 8
Origin: http://zhihu.vikingship.xyz
Referer: http://zhihu.vikingship.xyz/create
Accept - Encoding: gzip, deflate
Accept - Language: zh - CN, zh; q = 0.9, en; q = 0.8, en - GB; q = 0.7, en - US; q = 0.6

{ "title": "今天写后台Post", "content": "看看数据如何上传", "column": "643304ec9c298d584cb1125d", "author": "643304ec9c298d584cb1125c", "image": "6506aeba9c298d584cb11b29" }

返回
HTTP/1.1 200 OK
Server: cloudflare-nginx
Date: Sun, 17 Sep 2023 07:46:17 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 742
Connection: keep-alive
Vary: Origin
Access-Control-Allow-Origin: http://zhihu.vikingship.xyz
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
x-content-type-options: nosniff
x-download-options: noopen
x-readtime: 6

{"code":0,
"data":{"__v":0,"title":"今天写后台Post","content":"看看数据如何上传","column":"643304ec9c298d584cb1125d","author":{"_id":"643304ec9c298d584cb1125c","email":"110959751@qq.com","nickName":"yd 袁丁","avatar":{"_id":"64dcf23e9c298d584cb1186e","url":"http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/64dcf23e9c298d584cb1186e.jpg"},"description":"喜欢已经哲也的程序，edit，提交\n2023-9-9 提交\n"},"image":{"_id":"6506aeba9c298d584cb11b29","url":"http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/6506aeba9c298d584cb11b29.jpg"},"excerpt":"看看数据如何上传","_id":"6506aec99c298d584cb11b2a","updatedAt":"2023-09-17T07:46:17.916Z","createdAt":"2023-09-17 15:46:17"},
"msg":"请求成功"}

转到 column/id  yd的专栏
GET http://api.vikingship.xyz/api/columns/643304ec9c298d584cb1125d HTTP/1.1
Host: api.vikingship.xyz
Connection: keep-alive
Accept: application/json, text/plain,
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
User - Agent: Mozilla / 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 117.0.0.0 Safari / 537.36 Edg / 117.0.2045.31
Origin: http://zhihu.vikingship.xyz
Referer: http://zhihu.vikingship.xyz/column/643304ec9c298d584cb1125d
Accept - Encoding: gzip, deflate

OPTIONS http://api.vikingship.xyz/api/columns/643304ec9c298d584cb1125d/posts?currentPage=1&pageSize=5 HTTP/1.1
Host: api.vikingship.xyz
Connection: keep-alive
Accept: 
  Access - Control - Request - Method: GET
Access - Control - Request - Headers: authorization
Origin: http://zhihu.vikingship.xyz
User - Agent: Mozilla / 5.0(Windows NT 10.0; Win64; x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 117.0.0.0 Safari / 537.36 Edg / 117.0.2045.31
Sec - Fetch - Mode: cors
Referer: http://zhihu.vikingship.xyz/
Accept - Encoding: gzip, deflate
Accept - Language: zh - CN, zh; q = 0.9, en; q = 0.8, en - GB; q = 0.7, en - US; q = 0.6

3-----------
GET http://api.vikingship.xyz/api/columns/643304ec9c298d584cb1125d HTTP/1.1
返回：
HTTP/1.1 200 OK
Server: cloudflare-nginx
Date: Sun, 17 Sep 2023 07:46:20 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 272
Connection: keep-alive
Vary: Origin
Access-Control-Allow-Origin: http://zhihu.vikingship.xyz
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
x-content-type-options: nosniff
x-download-options: noopen
x-readtime: 1

{"code":0,"data":{"_id":"643304ec9c298d584cb1125d","title":"yd的专栏","description":"这是的yd专栏，有一段非常有意思的简介，可以更新一下欧","author":"643304ec9c298d584cb1125c","__v":0,"createdAt":"2023-04-09T18:33:16.203Z"},"msg":"请求成功"}

最后 返回  完整 已经发表专栏
HTTP/1.1 200 OK
Server: cloudflare-nginx
Date: Sun, 17 Sep 2023 07:46:20 GMT
Content-Type: application/json; charset=utf-8
Connection: keep-alive
Vary: Origin
Access-Control-Allow-Origin: http://zhihu.vikingship.xyz
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
x-content-type-options: nosniff
x-download-options: noopen
x-readtime: 9
Content-Length: 1384

{"code":0,"data":{"count":4,"list":[{"createdAt":"2023-09-17 15:46:17","excerpt":"看看数据如何上传","image":{"_id":"6506aeba9c298d584cb11b29","url":"http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/6506aeba9c298d584cb11b29.jpg"},"author":"643304ec9c298d584cb1125c","column":"643304ec9c298d584cb1125d","title":"今天写后台Post","_id":"6506aec99c298d584cb11b2a","key":0},{"createdAt":"2023-09-17 01:26:42","excerpt":"测试标签页","image":{"_id":"6505e5319c298d584cb11b22","url":"http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/6505e5319c298d584cb11b22.jpg"},"author":"643304ec9c298d584cb1125c","column":"643304ec9c298d584cb1125d","title":"测试标题","_id":"6505e5529c298d584cb11b23","key":1},{"createdAt":"2023-08-16 23:57:37","excerpt":"学习哲也","image":{"_id":"64dcf1d49c298d584cb1186b","url":"http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/64dcf1d49c298d584cb1186b.jpg"},"author":"643304ec9c298d584cb1125c","column":"643304ec9c298d584cb1125d","title":"测试过2023-8-17","_id":"64dcf1f19c298d584cb1186c","key":2},{"createdAt":"2023-04-10 02:46:13","excerpt":"编译正常但不能登录注册\n\t不显示注册信息\n","author":"643304ec9c298d584cb1125c","column":"643304ec9c298d584cb1125d","title":"编译正常但不能登录注册","_id":"643307f59c298d584cb1125e","key":3}],"pageSize":5,"currentPage":1},"msg":"请求成功"}

*/