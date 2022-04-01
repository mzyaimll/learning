/*
 * @Autor: GeekMzy
 * @Date: 2022-03-17 09:11:18
 * @LastEditors: GeekMzy
 * @LastEditTime: 2022-03-17 11:00:30
 * @FilePath: \htwlgs-drainage-webv2\clone.js
 * @Author: desktop-1llkr2o
 */

/**
 * no deep string number boolean null undefine
 * deep arr obj date error
 */

/* eslint-disable*/
function clone(target, map = new Map()) {

  if (!isObject(target)) return target  // 解决基本类型和null undefine

  const type = getType(target) // 获取引用对象真实类型
  if (type == '[object Symbol]') {
    return Object(Symbol.prototype.valueOf.call(target))
  }

  let cloneTarget = Array.isArray(target) ? [] : {};
  if (map.get(target)) return map.get(target)
  map.set(target, cloneTarget)
  for (const key in target) {
    cloneTarget[key] = clone(target[key], map);
  }
  return cloneTarget;
}

function getCtr(target) {
  let ctr = target.constructor
  return new ctr()
}

function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function' || type === 'symbol')
}

function getType(target) {
  return Object.prototype.toString.call(target)
}

const obj = {
  a: 1,
  b: 2,
  c: '123',
  d: false,
  e: null,
  f: undefined,
  ab: {
    a: 1,
    b: 2
  },
  ac: [1, '2'],
  as: Symbol(),
}
obj.obj = obj

const cloneObj = clone(obj)
console.log(cloneObj)
console.log(cloneObj.as == obj.as)
console.log(cloneObj.as === obj.as)


