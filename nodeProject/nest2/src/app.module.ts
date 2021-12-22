/*
 * @Autor: GeekMzy
 * @Date: 2021-12-21 16:28:43
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-22 11:22:01
 * @FilePath: \nodeProject\nest2\src\app.module.ts
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { AuthService } from './logical/auth/auth.service';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';
@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
