/*
 * @Autor: GeekMzy
 * @Date: 2021-12-07 16:21:53
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-07 17:23:17
 * @FilePath: \rustdir\src\main.rs
 */
#[derive(Debug)]
enum IpAddrKind {
  v4(u8, u8, u8, u8),
  v6(String),
}

fn route(ip_type: IpAddrKind) {
  println!("ip_type {:?}", ip_type);
}
#[derive(Debug)]
enum Message {
  Quit,
  Move { x: i32, y: i32 },
  Write(String),
  ChangeColor(i32, i32, i32),
}

impl Message {
  fn call(&self) {
    println!("call value {:?}", &self)
  }
}

struct QuitMessage;
struct MoveMessage {
  x: i32,
  y: i32,
}
struct WriteMessage(String);
struct ChangeColorMessage(i32, i32, i32);

pub fn main() {
  // let four = IpAddrKind::v4(127, 0, 0, 1);
  // let six = IpAddrKind::v6(String::from("::1"));

  // route(four);
  // route(six);

  let m = Message::Write(String::from("hello"));
  m.call()
}
