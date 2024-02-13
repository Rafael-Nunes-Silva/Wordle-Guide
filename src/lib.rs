use std::fmt::format;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub struct TestStruct {
    xyz: i32,
    abc: String,
}
#[wasm_bindgen]
impl TestStruct {
    pub fn new(x: i32, y: i32, z: i32, a: &str, b: &str, c: &str) -> TestStruct {
        TestStruct {
            xyz: x * y * z,
            abc: format!("{}{}{}", a, b, c),
        }
    }
}
