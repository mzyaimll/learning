/*
 * @Autor: GeekMzy
 * @Date: 2021-12-21 16:32:10
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-23 11:22:47
 * @FilePath: \nest2\src\logical\user\user.controller.ts
 */
import { Controller, Post, Body, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { LoginDTO, RegisterInfoDTO } from './uesr.dto';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiBody({
    description: '用户登录',
    type: LoginDTO,
  })
  async login(@Body() loginParams: LoginDTO) {
    console.log(`JWT验证 - step 1: 用户登录请求`);
    const authResult = await this.authService.validateUser(
      loginParams.username,
      loginParams.password,
    );
    switch (authResult.code) {
      case 1:
        return this.authService.certificate(authResult.user);
      case 2:
        return {
          code: 600,
          msg: '账号密码不正确',
        };
      default:
        return {
          code: 600,
          msg: '查无此人',
        };
    }
  }

  @Post('find-one')
  findOne(@Body() body: any) {
    return this.userService.findOne(body.username);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() body: RegisterInfoDTO) {
    return await this.userService.register(body);
  }
}
