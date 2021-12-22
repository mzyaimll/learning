/*
 * @Autor: GeekMzy
 * @Date: 2021-12-22 10:21:33
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-22 10:30:59
 * @FilePath: \nodeProject\nest2\config\db.ts
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
};

const config = productConfig;

export default config;
