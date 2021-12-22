/*
 * @Autor: GeekMzy
 * @Date: 2021-12-22 10:48:22
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-22 10:52:50
 * @FilePath: \nodeProject\nest2\src\utils\cryptogram.ts
 */
import * as crypto from 'crypto';

/**
 * @description: make salt
 * @event:
 * @param {*} params {*}
 * @return {*}
 **/
export function makeSalt(): string {
  return crypto.randomBytes(3).toString('base64');
}

/**
 * @description:
 * @event:
 * @param {password}  password
 * @param {salt}  password salt
 * @return {*}
 **/
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return crypto
    .pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1')
    .toString('base64');
}
