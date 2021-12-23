/*
 * @Autor: GeekMzy
 * @Date: 2021-12-21 16:28:43
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-23 10:29:17
 * @FilePath: \nest2\src\app.module.ts
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { AuthService } from './logical/auth/auth.service';
import { AuthModule } from './logical/auth/auth.module';
import { UserController } from './logical/user/user.controller';
import { CommodityModule } from './logical/commodity/commodity.module';
@Module({
  imports: [UserModule, AuthModule, CommodityModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
