import init, { get_suggestions } from "./pkg/wordle_guide.js";



var wordSize = 8;
const inputs = document.getElementsByClassName("letter-input");


init().then(function () { console.log("WASM loaded!") });

document.addEventListener("DOMContentLoaded", function (ev) {
    const buttons = document.getElementsByClassName("word-size-button");
    Array(...buttons).forEach(function (button, index) {
        button.addEventListener("click", function () {
            setWordSize(index + 2);
        })
    });
});
document.addEventListener("DOMContentLoaded", function (ev) {
    Array(...inputs).forEach(function (input, index) {
        input.addEventListener("change", function () {
            getSuggestions();
        })
    });
});

function setWordSize(size) {
    wordSize = size;
    const letterInputs = document.getElementsByClassName("letter-input");
    Array(...letterInputs).forEach(function (input, index) {
        if (index < size)
            input.style.display = "block";
        else input.style.display = "none";
    });
}

function getSuggestions() {
    let word = "";
    Array(...inputs).forEach(function (input, index) {
        word += input.value != ' ' ? input.value : ' ';
    });
    console.log(get_suggestions(word, wordSize));
}