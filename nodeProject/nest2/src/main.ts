/*
 * @Autor: GeekMzy
 * @Date: 2021-12-21 16:28:43
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-24 11:32:46
 * @FilePath: \learning\nodeProject\nest2\src\main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';

import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AllExceptionsFilter } from './filter/any-exception.filter';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // 监听所有的请求路由，并打印日志
  app.use(logger); //日志中间件
  app.useGlobalInterceptors(new TransformInterceptor()); //全局拦截器
  app.useGlobalFilters(new HttpExceptionFilter()); //http过滤器
  app.useGlobalFilters(new AllExceptionsFilter()); //错误过滤器

  // 配置 Swagger
  const options = new DocumentBuilder()
    .addBearerAuth() // 开启 BearerAuth 授权认证
    .setTitle('Nest zero to one')
    .setDescription('The nest-zero-to-one API description')
    .setVersion('1.0')
    .addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(3000);
}
bootstrap();
