use std::{fs::File, io::prelude::*};

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn get_suggestions(letters: &str, letters_count: usize) -> Vec<String> {
    let mut words_file = File::open("words_dictionary.txt").unwrap();

    let mut file_content = String::new();
    words_file.read_to_string(&mut file_content).unwrap();

    let letters: Vec<char> = letters.chars().collect();

    let suggestions: Vec<String> = file_content
        .split("\n")
        .filter(|s| {
            let s_len = s.chars().count();
            if s_len < letters_count && s_len > letters_count {
                return false;
            }

            let s_chars: Vec<char> = s.chars().collect();
            for i in 0..s_len {
                let letters_char = letters.get(i).unwrap();
                if letters_char == &' ' {
                    continue;
                }

                let s_char = s_chars.get(i).unwrap();
                if letters_char != s_char {
                    return false;
                }
            }

            return true;
        })
        .map(|s| String::from(s))
        .collect();

    suggestions
}
