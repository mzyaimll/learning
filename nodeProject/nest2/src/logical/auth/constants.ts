/*
 * @Autor: GeekMzy
 * @Date: 2021-12-22 11:09:39
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-23 11:04:16
 * @FilePath: \nest2\src\logical\auth\constants.ts
 */
export const jwtConstants = {
  secret: 'shinobi7414', //秘钥
};

export const roleConstans = {
  SUPER_ADMIN: 0, //超级管理员
  ADMIN: 1, //管理员
  DEVELOPER: 2, //开发者（测试、运营具有同一权限，若提升为 RBAC 1 以上，则可酌情分开）
  HUMAN: 3, //普通用户
};
