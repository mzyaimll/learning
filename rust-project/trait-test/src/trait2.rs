/*
 * @Autor: GeekMzy
 * @Date: 2022-03-02 16:35:37
 * @LastEditors: GeekMzy
 * @LastEditTime: 2022-03-02 16:54:12
 * @FilePath: \rust-project\trait-test\src\main.rs
 * @Author: desktop-1llkr2o
 */
use std::fmt;
use std::io::Write;
#[derive(Debug)]
struct BufBuilder {
    buf: Vec<u8>,
}
impl BufBuilder {
    pub fn new() -> Self {
        Self {
            buf: Vec::with_capacity(1024),
        }
    }
}

impl Write for BufBuilder {
    fn write(&mut self, buf: &[u8]) -> std::io::Result<usize> {
        self.buf.extend_from_slice(buf);
        Ok(buf.len())
    }

    fn flush(&mut self) -> std::io::Result<()> {
        Ok(())
    }
}

fn main() {
    let mut buf = BufBuilder::new();
    buf.write_all(b"Hello world").unwrap();
    println!("{:?}", buf);
}
