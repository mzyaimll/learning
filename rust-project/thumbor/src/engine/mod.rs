/*
 * @Autor: GeekMzy
 * @Date: 2022-02-14 17:14:29
 * @LastEditors: GeekMzy
 * @LastEditTime: 2022-02-14 17:17:38
 * @FilePath: \thumbor\src\engine\mod.rs
 * @Author: desktop-1llkr2o
 */
use crate::pb::Spec;
use image::ImageOutputFormat;

mod photon;
pub use photon::Photon;

pub trait Engine {
    fn apply(&mut self, sepcs: &[Spec]);

    fn generate(self, format: ImageOutputFormat) -> Vec<u8>;
}

pub trait SpecTransform<T> {
    fn transform(&mut self, op: T);
}
