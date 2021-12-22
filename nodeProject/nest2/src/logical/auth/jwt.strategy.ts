/*
 * @Autor: GeekMzy
 * @Date: 2021-12-22 11:10:43
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-22 15:31:30
 * @FilePath: \nodeProject\nest2\src\logical\auth\jwt.strategy.ts
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './constants';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    return {
      userId: payload.sub,
      username: payload.username,
      realName: payload.realName,
      role: payload.role,
    };
  }
}
