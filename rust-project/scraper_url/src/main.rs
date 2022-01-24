/*
 * @Autor: GeekMzy
 * @Date: 2022-01-24 16:55:43
 * @LastEditors: GeekMzy
 * @LastEditTime: 2022-01-24 17:00:43
 * @FilePath: \rust-project\scraper_url\src\main.rs
 * @Author: desktop-1llkr2o
 */
use std::fs;

fn main() {
    let url = "http://www.rust-lang.org";
    let output = "rust.md";
    println!("Fetching url: {}", url);
    let body = reqwest::blocking::get(url).unwrap().text().unwrap();

    println!("Converting html to markdown...");
    let md = html2md::parse_html(&body);

    fs::write(output, md.as_bytes()).unwrap();
    println!("Converted markdown has been saved in {}.", output);
}
