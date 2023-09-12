
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {  //异常拦截器
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()  //get request and response
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()  //get status code

        response.status(status).json({
            code: 6,
            data: exception.message,
            time: new Date().getTime(),
            success: false,
            path: request.url,
            status,

        })
    }
}