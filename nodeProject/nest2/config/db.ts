/*
 * @Autor: GeekMzy
 * @Date: 2021-12-22 10:21:33
 * @LastEditors: GeekMzy
 * @LastEditTime: 2022-01-05 15:33:43
 * @FilePath: \nodeProject\nest2\config\db.ts
 */
const productConfig = {
  mysql: {
    port: 9988,
    host: '139.198.108.131',
    user: 'root',
    password: 'Mzy123456.',
    database: 'nest_zero_to_one',
    connectionLimit: 10,
  },
  redis: {
    port: 8899,
    host: '139.198.108.131',
    db: 0,
    password: '',
  },
};

const config = productConfig;

export default config;
