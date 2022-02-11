/*
 * @Autor: GeekMzy
 * @Date: 2022-02-11 16:55:44
 * @LastEditors: GeekMzy
 * @LastEditTime: 2022-02-11 17:12:57
 * @FilePath: \httpie\src\main.rs
 * @Author: desktop-1llkr2o
 */
use clap::Parser;

/// Simple program to greet a person
#[derive(Parser, Debug)]
#[clap(author, version, about, long_about = None)]
struct Args {
    /// Name of the person to greet
    #[clap(short, long)]
    name: String,

    /// Number of times to greet
    #[clap(short, long, default_value_t = 1)]
    count: u8,
}

fn main() {
    let args = Args::parse();

    for _ in 0..args.count {
        println!("Hello {}!", args.name)
    }
}
