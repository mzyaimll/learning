/*
 * @Autor: GeekMzy
 * @Date: 2021-12-10 16:32:42
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-10 17:29:24
 * @FilePath: \nest1\src\app.controller.ts
 */
import { Controller, Get, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('list')
  getHello(): string {
    return this.appService.getHello();
  }

  // 2.通配符路径(?+* 三种通配符 )
  // 可以匹配到 get请求, http://localhost:9080/app/user_xxx
  @Get('user_*')
  getUser(): string {
    return 'getUser';
  }

  @Put('list/user')
  getList(): string {
    return 'user list';
  }
  // 3.带参数路径
  // 可以匹配到put请求，http://localhost:9080/app/list/xxxx
  @Put('list/:id')
  update() {
    return 'update';
  }
}
