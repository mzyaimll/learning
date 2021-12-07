/*
 * @Autor: GeekMzy
 * @Date: 2021-12-07 16:21:53
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-07 17:00:57
 * @FilePath: \rustdir\src\main.rs
 */
#[derive(Debug)]
struct Rectangle {
  width: u32,
  height: u32,
}

impl Rectangle {
  fn area(&self) -> u32 {
    self.width * self.height
  }
  fn width(&self) -> bool {
    self.width > 0
  }
  fn can_hold(&self, other: &Rectangle) -> bool {
    self.width > other.width && self.height > other.height
  }
  fn square(size: u32) -> Rectangle {
    Rectangle {
      width: size,
      height: size,
    }
  }
}

pub fn main() {
  let square1 = Rectangle::square(5);
  println!("create a square width is {:?}", square1);
  let rect1 = Rectangle {
    width: 30,
    height: 50,
  };
  let rect2 = Rectangle {
    width: 10,
    height: 30,
  };
  println!("can rect1 hold rect2? it is {}", rect1.can_hold(&rect2));
  println!(
    "The area of the rectangle is {} square pixels",
    rect1.area()
  );
  println!("rect1 has a nonzero width; it is {}", rect1.width())
}
