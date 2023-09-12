// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class RoleGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     console.log('RoleGuard:------------------');
//     return true;
//   }
// }

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';

@Injectable() //  role == admin 相等才能通过，否则返回false
export class RoleGuard implements CanActivate {
  constructor(private Reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //console.log('经过了Guard：：：：：：：' + context.getHandler());
    const admin = this.Reflector.get<string[]>('role', context.getHandler());
   // console.log('RoleGuard:----方法1 role = admin----：' + admin);
   // console.log('context.getHandler()：' + context.getHandler());  //获取当前路由
    const request = context.switchToHttp().getRequest<Request>();
    console.log('RoleGuard:----方法3 role = admin----：' +  admin + '---' +  request.query.role,  );
    if (admin.includes(request.query.role as string)) {
      return true;
    } else {
      return false;
    }
  }
}
