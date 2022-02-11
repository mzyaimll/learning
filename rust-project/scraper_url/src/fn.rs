/*
 * @Autor: GeekMzy
 * @Date: 2022-01-24 16:55:43
 * @LastEditors: GeekMzy
 * @LastEditTime: 2022-01-25 14:15:40
 * @FilePath: \scraper_url\src\main.rs
 * @Author: desktop-1llkr2o
 */
/*
 * @Autor: GeekMzy
 * @Date: 2022-01-24 16:55:43
 * @LastEditors: GeekMzy
 * @LastEditTime: 2022-01-25 14:15:24
 * @FilePath: \scraper_url\src\main.rs
 * @Author: desktop-1llkr2o
 */
fn apply(value: i32, f: fn(i32) -> i32) -> i32 {
    f(value)
}

fn square(value: i32) -> i32 {
    value * value
}

fn cube(value: i32) -> i32 {
    value * value * value
}

fn pi() -> f64 {
    3.1415926
}

fn not_pi() {
    3.1415926;
}

fn main() {
    let is_pi = pi();
    let is_unit1 = not_pi();
    let is_unit2 = {
        pi();
    };
    println!(
        "is_pi: {:?}, is_unit1: {:?}, is_unit2: {:?}",
        is_pi, is_unit1, is_unit2
    );
    // println!("{}", pi());
    // println!("apply square: {}", apply(2, square));
    // println!("apply cube: {}", apply(2, cube));
}
