/*
 * @Autor: GeekMzy
 * @Date: 2021-12-07 16:21:53
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-07 17:27:19
 * @FilePath: \rustdir\src\main.rs
 */

enum Option<T> {
  Some(T),
  None,
}
pub fn main() {
  let some_number = Some(5);
  let some_string = Some("a string");
  let absent_number: Option<i32> = None;
}
