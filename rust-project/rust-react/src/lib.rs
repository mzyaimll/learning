/*
 * @Autor: GeekMzy
 * @Date: 2021-12-06 10:34:39
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-06 17:32:43
 * @FilePath: \rust-react\src\lib.rs
 */
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn big_computation() {
    alert("这是一个超级耗时的复杂计算逻辑");
}

#[wasm_bindgen]
pub fn welcome(name: &str) {
    alert(&format!("Hi 我是{}", name))
}
