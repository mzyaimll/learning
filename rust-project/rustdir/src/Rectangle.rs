/*
 * @Autor: GeekMzy
 * @Date: 2021-12-07 16:21:53
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-07 16:33:29
 * @FilePath: \rustdir\src\main.rs
 */

#[derive(Debug)]
struct Rectangle {
  width: u32,
  height: u32,
}

pub fn main() {
  let rect1 = Rectangle {
    width: 30,
    height: 50,
  };

  println!("the rect1 is {:#?}", rect1);
  println!("The area of the rectangle {} square pixels", area(&rect1));
}

fn area(rectangle: &Rectangle) -> u32 {
  rectangle.width * rectangle.height
}
