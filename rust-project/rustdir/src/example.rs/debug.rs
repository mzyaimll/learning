struct UnPrintable(i32);

#[derive(Debug)]
struct DebugPrintable(i32);

#[derive(Debug)]
struct Structure(i32);
#[derive(Debug)]
struct Deep(Structure);

fn main() {
  // 使用 `{:?}` 打印和使用 `{}` 类似。
  println!("{:?} months in a year.", 12);
  println!(
    "{1:?} {0:?} is the {actor:?} name.",
    "Slater",
    "Christian",
    actor = "actor's"
  );

  // `Structure` 也可以打印！
  println!("Now {:?} will print!", Structure(3));

  // 使用 `derive` 的一个问题是不能控制输出的形式。
  // 假如我只想展示一个 `7` 怎么办？
  println!("Now {:?} will print!", Deep(Structure(7)));
}
