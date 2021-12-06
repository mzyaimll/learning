/*
 * @Autor: GeekMzy
 * @Date: 2021-02-20 06:59:06
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-02-23 08:45:22
 * @FilePath: /js-base/src/promise.js
 */

const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve(5);
  console.log(2);
}).then(val => {
  console.log(val);
});

promise.then(() => {
  console.log(3);
});

console.log(4);

setTimeout(function () {
  console.log(6);
});
//面试啦
//执行结果: 124536