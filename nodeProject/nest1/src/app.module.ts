/*
 * @Autor: GeekMzy
 * @Date: 2021-12-17 16:17:28
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-21 15:59:48
 * @FilePath: \nodeProject\nest1\src\app.module.ts
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetModule } from './get/get.module';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
@Module({
  imports: [GetModule, CatsModule],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
