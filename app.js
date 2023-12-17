
const express = require('express');
// 加载bodyParser模块
const bodyParser = require('body-parser');
// API网址:https://github.com/produck/svg-captcha/blob/1.x/README_CN.md
// 加载图片验证码模块
const svgCaptcha = require('svg-captcha');
// 创建服务器对象
const server = express();
server.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
//静态资源管理
server.use(express.static('public'));

// 图片验证码接口
server.get('/captcha', (req, res) => {
  // 设置字母随机验证码相关属性
  let options = {
    size: 4, // 4个字母
    noise: 2, // 干扰线2条
    color: true, // 文字颜色
    background: '#666', // 背景颜色
    // 数字的时候，设置下面属性。最大，最小，加或者减
    // mathMin: 1,
    // mathMax: 30,
    // mathOperator: "+",
  };
  //这里可以分为字母和数字随机验证码和数字算数随机验证码,
  //我就先展示字母和数字随机验证码了,
  //如果想尝试数字算数随机验证码可以将下一行取消注释,将数字算数验证码解开注释即可
  let captcha = svgCaptcha.create(options); //字母和数字随机验证码
  // let captcha = svgCaptcha.createMathExpr(options) //数字算数随机验证码

  let { text, data } = captcha;
   console.log(text,data);
  // text是指产生的验证码，data指svg的字节流信息
  res.type('svg');
  res.send({ img: captcha.data, str: captcha.text });
});

// 指定服务器对象监听的端口
server.listen(3002, () => {
  console.log('服务器启动成功...');
});
