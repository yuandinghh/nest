import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { jwtConstants } from "./../auth/constants";  只是密钥

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<any> {
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization.split(' ')[1];
        const user = await this.jwtService.verifyAsync(token, { secret: 'secret' })
        req.query.userId = user.userId
        req.body.userId = user.userId
        return true;
    }
}

