/*
 * @Autor: GeekMzy
 * @Date: 2021-12-21 16:36:54
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-22 16:15:45
 * @FilePath: \nodeProject\nest2\src\logical\user\user.module.ts
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
// import { UserController } from './user.controller';
@Module({
  // controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
