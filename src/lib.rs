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
    let suggestions = words
        .iter()
        .filter(|word| {
            for word_char in word.chars() {
                for known_char in known.chars() {
                    if known_char == ' ' {
                        continue;
                    }

                    if known_char != word_char {
                        return false;
                    }
                }
            }
            return true;
        })
        .filter(|word| {
            for word_char in word.chars() {
                for found_char in found.chars() {
                    if word_char == found_char {
                        return true;
                    }
                }
            }
            return false;
        })
        .filter(|word| {
            for word_char in word.chars() {
                for excluded_char in excluded.chars() {
                    if word_char == excluded_char {
                        return false;
                    }
                }
            }
            return true;
        })
        .map(|word| String::from(word))
        .collect();

    suggestions
}
// pub fn get_suggestions(letters: &str, letters_count: usize) -> Vec<String> {
//     ////////////////
//     /// TODO
//     /// accept letters that should be in the word but you don't know where
//     /// should also accept letters that aren't in the word
//     /// refactor the whole function
//     /// access the words file somehow
//     /// if nothing works, make a module with the words and have it compile into te wasm

//     // let mut words_file =
//     //     File::open("words_dictionary.txt").expect("Expected to have opened the words file");

//     // let mut file_content = String::new();
//     let file_content = String::from(
//         "a\naa\naaa\naah\naahed\naahing\naahs\naal\naalii\naaliis\naals\naam\naani\naardvark\naardvarks\naardwolf\naardwolves\n");
//     // words_file
//     //     .read_to_string(&mut file_content)
//     //     .expect("Expected to have read the file");

//     let letters_chars: Vec<char> = letters.chars().collect();

//     let suggestions: Vec<String> = file_content
//         .split("\n")
//         .filter(|s| {
//             let s_count = s.chars().count();
//             if s_count < letters_count || s_count > letters_count {
//                 return false;
//             }

//             let s_chars: Vec<char> = s.chars().collect();
//             for i in 0..min(letters_count, s_count) {
//                 let letters_char = letters_chars.get(i).expect(&format!(
//                     "Expected to have got the {}th char from {}",
//                     i, letters
//                 ));
//                 if letters_char == &' ' {
//                     continue;
//                 }

//                 let s_char = s_chars
//                     .get(i)
//                     .expect(&format!("Expected to have got the {}th char from {}", i, s));
//                 if letters_char != s_char {
//                     return false;
//                 }
//             }

//             return true;
//         })
//         .map(|s| String::from(s))
//         .collect();

//     suggestions
// }
