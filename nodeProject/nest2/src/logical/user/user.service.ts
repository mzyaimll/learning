/*
 * @Autor: GeekMzy
 * @Date: 2021-12-21 16:31:03
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-23 09:48:23
 * @FilePath: \nest2\src\logical\user\user.service.ts
 */
import { Injectable, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as Sequelize from 'sequelize';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import sequelize from '../../../database/sequelize';
import { makeSalt, encryptPassword } from '../../utils/cryptogram';

@Injectable()
export class UserService {
  /**
   * @description: 查询是否有该用户
   * @event:
   * @param {*} params {*}
   * @return {*}
   **/
  async findOne(username: string): Promise<any | undefined> {
    const sql = `
      SELECT
        user_id userId, account_name username, real_name realName, passwd password,
        passwd_salt salt, mobile, role
      FROM
        admin_user
      WHERE
        account_name = '${username}'
    `; // 一段平淡无奇的 SQL 查询语句
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT,
        raw: true,
        logging: true,
      });
      const user = res[0];
      if (user) {
        return {
          code: 200,
          data: {
            user,
          },
          msg: 'Success',
        };
      } else {
        return {
          code: 600,
          msg: '查无此人',
        };
      }
    } catch (err) {
      return {
        code: 503,
        msg: `error: ${err}`,
      };
    }
  }

  async register(requestBody: any): Promise<any> {
    const { accountName, realName, password, repassword, mobile } = requestBody;
    if (password !== repassword) {
      return {
        code: 400,
        msg: '两次密码输入不一致',
      };
    }
    const user = await this.findOne(accountName);
    if (user.data) {
      console.log(user);
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    const salt = makeSalt();
    const hashPwd = encryptPassword(password, salt);
    const registerSQL = `
      INSERT INTO admin_user
        (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
      VALUES
        ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
    `;
    try {
      await sequelize.query(registerSQL, { logging: false });
      return {
        code: 200,
        msg: 'Success',
      };
    } catch (err) {
      return {
        code: 500,
        msg: `error ${err}`,
      };
    }
  }
}
