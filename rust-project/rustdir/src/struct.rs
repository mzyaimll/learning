/*
 * @Autor: GeekMzy
 * @Date: 2021-12-07 14:56:03
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-07 16:18:31
 * @FilePath: \rustdir\src\struct.rs
 */
struct User {
  username: String,
  email: String,
  sign_in_count: u64,
  active: bool,
}

struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

struct AlwaysEqual;

pub fn main() {
  let subject = AlwaysEqual;

  let black = Color(0, 0, 0);
  let origin = Point(0, 0, 0);

  let mut user1 = User {
    email: String::from("some@qq.com"),
    username: String::from("some"),
    active: true,
    sign_in_count: 1,
  };
  let user2 = User {
    email: String::from("geekm@mail.com"),
    ..user1
  };
  // user1.email = build_user(String::from("geekm@gmail.com"),String::from("geek"));
}

fn build_user(email: String, username: String) -> User {
  User {
    username,
    email,
    sign_in_count: 1,
    active: true,
  }
}
