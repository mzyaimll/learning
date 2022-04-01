/*
 * @Autor: GeekMzy
 * @Date: 2022-03-17 15:39:33
 * @LastEditors: GeekMzy
 * @LastEditTime: 2022-03-17 16:48:17
 * @FilePath: \htwlgs-zhhc-app\tree.js
 * @Author: desktop-1llkr2o
 */
/* eslint-disable */
const Tree = {
  id: "1",
  children: [
    {
      id: "2",
      children: [
        { id: "3", children: [{ id: "4" }] },
        { id: "5" },
        { id: "6", children: [{ id: "7" }] },
      ],
    },
    { id: "8", children: [{ id: "9" }] },
  ],
};
const val = "1";
let toggle = false;
let over = false;

function fn(root, ans = []) {
  if (over) return;
  if (toggle) {
    ans.push(root.id);
  }
  if (toggle == false && root.id == val) {
    toggle = true;
    if (root.children) {
      for (key in root.children) {
        fn(root.children[key], ans);
      }
    }
    over = true;
    toggle = false;
  }
  if (root.children) {
    for (key in root.children) {
      fn(root.children[key], ans);
    }
  }
  return ans;
}
const beginTime = +new Date();
console.log(fn(Tree));
const endTime = +new Date();
console.log("运行用时:" + (endTime - beginTime) + "ms");
