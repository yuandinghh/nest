import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class Logger implements NestMiddleware {  //implements 类型约束
    use(req: Request, res: Response, next: NextFunction) {
       // console.log(req)
        console.log("welcome to my nest")
        console.log("请求的方法是：", req.method)
        res.send("请求的方法是：") 
       next()
    }
}

/*  拦截器是使用 @Injectable() 装饰器注解的类。拦截器应该实现 NestInterceptor 接口。
拦截器具有一系列有用的功能，这些功能受面向切面编程（AOP）技术的启发。它们可以：

在函数执行之前/之后绑定额外的逻辑
转换从函数返回的结果
转换从函数抛出的异常
扩展基本函数行为
根据所选条件完全重写函数 (例如, 缓存目的)
基础拦截器
每个拦截器都有 intercept() 方法，它接收2个参数。 第一个是 ExecutionContext 实例（与守卫完全相同的对象）。 ExecutionContext 继承自 ArgumentsHost 。 ArgumentsHost 是传递给原始处理程序的参数的一个包装 ，它根据应用程序的类型包含不同的参数数组。你可以在这里读更多关于它的内容（在异常过滤器章节中）。

中间件是在路由处理程序 之前 调用的函数。 中间件函数可以访问请求和响应对象
中间件函数可以执行以下任务:
执行任何代码。
对请求和响应对象进行更改。
结束请求-响应周期。
调用堆栈中的下一个中间件函数。
如果当前的中间件函数没有结束请求-响应周期, 它必须调用 next() 将控制传递给下一个中间件函数。否则, 请求将被挂起。
原文链接：https://blog.csdn.net/qq1195566313/article/details/126753289
*/