/*
 * @Autor: GeekMzy
 * @Date: 2021-12-17 16:17:28
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-21 16:27:32
 * @FilePath: \nodeProject\nest1\src\main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
