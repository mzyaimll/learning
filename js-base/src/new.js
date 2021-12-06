/*
 * @Autor: GeekMzy
 * @Date: 2021-02-20 07:07:30
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-02-20 07:12:12
 * @FilePath: /js-base/src/new.js
 */

var Dog = function (name) {
  this.name = name
}
Dog.prototype.bark = function () {
  console.log('dog is bark');
}

function _new (fn, ...args) {
  const obj = Object.create(fn.prototype)
  const ret = fn.apply(obj, args)
  return ret instanceof Object ? res : obj
}

let dog1 = _new(Dog, '小花')
dog1.bark()