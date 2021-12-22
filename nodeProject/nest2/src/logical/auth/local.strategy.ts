/*
 * @Autor: GeekMzy
 * @Date: 2021-12-22 11:15:27
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-22 11:15:28
 * @FilePath: \nodeProject\nest2\src\logical\auth\local.strategy.ts
 */
// src/logical/auth/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
