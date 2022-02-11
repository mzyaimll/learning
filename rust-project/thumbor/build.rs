/*
 * @Autor: GeekMzy
 * @Date: 2022-02-11 15:46:55
 * @LastEditors: GeekMzy
 * @LastEditTime: 2022-02-11 15:49:14
 * @FilePath: \thumbor\build.rs
 * @Author: desktop-1llkr2o
 */
fn main() {
  prost_build::Config::new()
    .out_dir("src/pb")
    .compile_protos(&["abi.proto"],&["."])
    .unwrap();
}