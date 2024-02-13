use std::{fs::File, io::Read};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn get_suggestions(letters: &str, letters_count: usize) -> Vec<String> {
    let mut words_file =
        File::open("words_dictionary.txt").expect("Expected to have opened the words file");

    alert(letters);
    alert(&format!("letters_count: {}", letters_count));

    let mut file_content = String::new();
    words_file
        .read_to_string(&mut file_content)
        .expect("Expected to have read the file");

    let letters_chars: Vec<char> = letters.chars().collect();

    let suggestions: Vec<String> = file_content
        .split("\n")
        .filter(|s| {
            let s_len = s.chars().count();
            if s_len < letters_count && s_len > letters_count {
                return false;
            }

            alert(&format!("s_len: {}", s_len));

            let s_chars: Vec<char> = s.chars().collect();
            for i in 0..letters_count {
                let letters_char = letters_chars.get(i).expect(&format!(
                    "Expected to have got the {}th char from {}",
                    i, letters
                ));
                alert(&format!("letters_char: {}", letters_char));
                if letters_char == &' ' {
                    continue;
                }

                let s_char = s_chars
                    .get(i)
                    .expect(&format!("Expected to have got the {}th char from {}", i, s));
                alert(&format!("s_char: {}", s_char));
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
