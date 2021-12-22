/*
 * @Autor: GeekMzy
 * @Date: 2021-12-21 14:58:01
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-21 16:19:34
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
import { CatsService } from './cats.service';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto/index';
import { Cat } from './interfaces/Cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catService: CatsService) {}
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.findAll();
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
