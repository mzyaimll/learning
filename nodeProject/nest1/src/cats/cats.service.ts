/*
 * @Autor: GeekMzy
 * @Date: 2021-12-21 14:58:36
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-21 16:15:44
 * @FilePath: \nodeProject\nest1\src\cats\cats.service.ts
 */
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/Cat.interface';
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
