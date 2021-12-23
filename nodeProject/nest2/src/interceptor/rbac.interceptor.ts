/*
 * @Autor: GeekMzy
 * @Date: 2021-12-23 10:05:02
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-23 11:03:15
 * @FilePath: \nest2\src\interceptor\rbac.interceptor.ts
 */
import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RbacInterceptor implements NestInterceptor {
  // role[用户角色]: 0-超级管理员 | 1-管理员 | 2-开发&测试&运营 | 3-普通用户（只能查看）
  constructor(private readonly role: number) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    if (req.user.role > this.role) {
      throw new ForbiddenException('无权操作!');
    }
    return next.handle();
  }
}
