/*
 * @Autor: GeekMzy
 * @Date: 2021-12-22 10:21:33
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-23 14:46:28
 * @FilePath: \nest2\config\db.ts
 */
const productConfig = {
  mysql: {
    port: 3306,
    host: '139.198.108.131',
    user: 'root',
    password: '123456',
    database: 'nest_zero_to_one',
    connectionLimit: 10,
  },
  redis: {
    port: 6379,
    host: '139.198.108.131',
    db: 0,
    password: '123456',
  },
};

const config = productConfig;

export default config;
