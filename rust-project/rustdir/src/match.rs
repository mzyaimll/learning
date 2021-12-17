/*
 * @Autor: GeekMzy
 * @Date: 2021-12-08 09:52:46
 * @LastEditors: GeekMzy
 * @LastEditTime: 2021-12-08 10:32:47
 * @FilePath: \rustdir\src\main.rs
 */
enum Coin {
  Penny,
  Nickel,
  Dime,
  Quarter,
}

fn value_in_centes(coin: Coin) -> u8 {
  // match coin {
  //   Coin::Penny => 1,
  //   Coin::Nickel => 5,
  //   Coin::Dime => 10,
  //   Coin::Quarter => 25,
  // }
  if let Coin::Quarter = coin {
    println!("state quarter from {:?}!", String::from(coin))
  }
}

pub fn main() {
  let coin = Coin::Quarter;
  value_in_centes(coin)
}
