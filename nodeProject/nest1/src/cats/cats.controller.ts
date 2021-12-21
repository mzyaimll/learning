/*
 * @Autor: GeekMzy
 * @Date: 2021-12-21 14:58:01
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-21 16:02:51
 * @FilePath: \nodeProject\nest1\src\cats\cats.controller.ts
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto/index';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return `this action add a new cat`;
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `this action returns all cats (limit: ${query} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `this action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `this action update a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
