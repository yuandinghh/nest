// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';

// @Injectable()
// export class RoleGuardGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}  
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     console.log('RoleGuard:------------------');
//     return true;
//   }
// }

//guard.ts

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'
import type { Request } from 'express'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const admin = this.reflector.get<string[]>('role', context.getHandler()) /* 此key 值为SetMetadata中定义的key值 */
    const req = context.switchToHttp().getRequest<Request>()
    //console.log('经过了守卫', admin, req);
    console.log('经过了守卫admin :::' + admin + '-------req.query.role:' + JSON.stringify(req.query));//req.query.role:{"role":"admin"}
    // 做权限验证，如果有就过
    if (admin.includes(req.query.role as string)) {
      return true
    } else {
      return false
    }
  }
}

