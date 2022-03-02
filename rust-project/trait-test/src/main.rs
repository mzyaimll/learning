/*
 * @Autor: GeekMzy
 * @Date: 2022-03-02 16:58:43
 * @LastEditors: GeekMzy
 * @LastEditTime: 2022-03-02 17:46:51
 * @FilePath: \rust-project\trait-test\src\main.rs
 * @Author: desktop-1llkr2o
 */
use regex::Regex;
use std::str::FromStr;
pub trait Parser {
    fn parse(s: &str) -> Self;
}

impl<T> Parser for T
where
    T: FromStr + Default,
{
    fn parse(s: &str) -> Self {
        let re: Regex = Regex::new(r"^[0-9]+(\.[0-9]+)?").unwrap();
        let d = || Default::default();
        if let Some(captures) = re.captures(s) {
            captures
                .get(0)
                .map_or(d(), |s| s.as_str().parse().unwrap_or(d()))
        } else {
            d()
        }
    }
}

#[test]
fn parse_should_work() {
    assert_eq!(u32::parse("123abcd"), 123);
    assert_eq!(u32::parse("123.45abcd"), 0);
    assert_eq!(f64::parse("123.45abcd"), 123.45);
    assert_eq!(f64::parse("abcd"), 0f64);
}

fn main() {
    println!("result: {}", u8::parse("255 hello world"));
}
