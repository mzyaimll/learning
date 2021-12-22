/*
 * @Autor: GeekMzy
 * @Date: 2021-12-21 16:28:43
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-22 17:04:05
 * @FilePath: \nodeProject\nest2\src\main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';

import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AllExceptionsFilter } from './filter/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // 监听所有的请求路由，并打印日志
  app.use(logger);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
