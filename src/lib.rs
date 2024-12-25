use std::cmp::Ordering;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn get_suggestions(
    known: &str,
    found: &str,
    excluded: &str,
    words: Vec<String>,
) -> Vec<String> {
    let mut suggestions: Vec<String> = words
        .iter()
        .filter(|word| {
            let known_chars: Vec<char> = known.chars().collect();
            let word_chars: Vec<char> = word.chars().collect();
            for i in 0..known_chars.len() {
                let known_char = known_chars.get(i).unwrap();
                if known_char == &' ' {
                    continue;
                }

                let word_char = word_chars.get(i).unwrap();
                if known_char != word_char {
                    return false;
                }
            }

            true
        })
        .filter(|word| {
            if found.chars().count() == 0 {
                return true;
            }

            for word_char in word.chars() {
                for found_char in found.chars() {
                    if word_char == found_char {
                        return true;
                    }
                }
            }

            false
        })
        .filter(|word| {
            for word_char in word.chars() {
                for excluded_char in excluded.chars() {
                    if word_char == excluded_char {
                        return false;
                    }
                }
            }

            true
        })
        .map(|word| String::from(word))
        .collect();

    (*suggestions).sort_by(|a, b| {
        let letters_in_a = letters_in_word(a);
        let letters_in_b = letters_in_word(b);

        if letters_in_a > letters_in_b {
            return Ordering::Less;
        }
        if letters_in_a < letters_in_b {
            return Ordering::Greater;
        }
        Ordering::Equal
    });

    suggestions
}

fn letters_in_word(word: &str) -> usize {
    let mut chars_in_word: Vec<char> = Vec::new();
    for char in word.chars() {
        if !chars_in_word.contains(&char) {
            chars_in_word.push(char);
        }
    }

    chars_in_word.len()
}
