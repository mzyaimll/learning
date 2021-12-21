/*
 * @Autor: GeekMzy
 * @Date: 2021-12-21 14:32:07
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-21 14:48:50
 * @FilePath: \nodeProject\nest1\src\get\get.controller.ts
 */
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
@Controller('get')
export class GetController {
  @Get()
  findAll(@Req() request: Request): string {
    return `this action return all cats2`;
  }
}
