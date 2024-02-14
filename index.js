import init, { get_suggestions } from "./pkg/wordle_guide.js";



init().then(function () { console.log("WASM loaded!") });
fetch("words_dictionary.txt")
    .then((response) => response.text())
    .then((text) => {
        const ALL_WORDS = text.split("\n");
        words_2 = ALL_WORDS.filter(function (word) { return word.length == 2 });
        words_3 = ALL_WORDS.filter(function (word) { return word.length == 3 });
        words_4 = ALL_WORDS.filter(function (word) { return word.length == 4 });
        words_5 = ALL_WORDS.filter(function (word) { return word.length == 5 });
        words_6 = ALL_WORDS.filter(function (word) { return word.length == 6 });
        words_7 = ALL_WORDS.filter(function (word) { return word.length == 7 });
        words_8 = ALL_WORDS.filter(function (word) { return word.length == 8 });
    });


document.addEventListener("DOMContentLoaded", setupButtons);
document.addEventListener("DOMContentLoaded", setupKnownInputs);
document.addEventListener("DOMContentLoaded", setupFoundInputs);
document.addEventListener("DOMContentLoaded", setupExcludedInputs);


const KNOWN_INPUTS = Array(...document.getElementsByClassName("known"));
const FOUND_INPUTS = Array(...document.getElementsByClassName("found"));
const EXCLUDED_INPUTS = Array(...document.getElementsByClassName("excluded"));
const SUGGESTION_ELEMS = Array(...document.getElementsByClassName("suggestion"));
const MAX_SUGGESTIONS = 20;
var words_2 = [];
var words_3 = [];
var words_4 = [];
var words_5 = [];
var words_6 = [];
var words_7 = [];
var words_8 = [];
var words = words_8;
var wordSize = 8;



document.addEventListener("DOMContentLoaded", function () {
    const SUGGESTION_DIV = document.getElementById("suggestions");
    for (let i = 0; i < MAX_SUGGESTIONS; i++) {
        const SUGGESTION_NODE = document.createElement("span");
        SUGGESTION_NODE.className = "suggestion";
        SUGGESTION_DIV.appendChild(SUGGESTION_NODE);
    }

    const FOUND_DIV = document.getElementById("found-letters");
    for (let i = 0; i < 26; i++) {
        const FOUND_NODE = document.createElement("input");
        FOUND_NODE.classList.add("found", "letter-input");
        FOUND_NODE.type = "text";
        FOUND_NODE.maxLength = 1;
        FOUND_NODE.addEventListener("change", function () {

        });
        FOUND_DIV.appendChild(FOUND_NODE);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const ALL_INPUTS = KNOWN_INPUTS.concat(FOUND_INPUTS).concat(EXCLUDED_INPUTS);
    ALL_INPUTS.forEach(function (input) {
        input.addEventListener("change", getSuggestions);
    });

    FOUND_INPUTS.forEach(function (input) {
        input.addEventListener("change", updateInputsEvents);
    });
    EXCLUDED_INPUTS.forEach(function (input) {
        input.addEventListener("change", updateInputsEvents);
    });
});


function setupButtons() {
    const BUTTONS = Array(...document.getElementsByClassName("word-size-button"));
    BUTTONS.forEach(function (button, index) {
        button.addEventListener("click", function () {
            setWordSize(index + 2);
            getSuggestions();
        })
    });
}
function setupKnownInputs() {
    KNOWN_INPUTS.forEach(function (input) {
        input.addEventListener("change", getSuggestions);
    })
}
function setupFoundInputs() {
    FOUND_INPUTS.forEach(function (input) {
        input.addEventListener("change", getSuggestions);
        input.addEventListener("change", updateInputs);
    })
}
function setupExcludedInputs() {
    EXCLUDED_INPUTS.forEach(function (input) {
        input.addEventListener("change", getSuggestions);
        input.addEventListener("change", updateInputs);
    })
}

function updateInputs() {
    for (let i = FOUND_INPUTS.length - 1; i > 0; i++) {
        if (FOUND_INPUTS[i].value == '' && FOUND_INPUTS[i - 1].value == '') {
            FOUND_INPUTS[i].style.display == "none";
        }
        else if (FOUND_INPUTS[i].value == '' && FOUND_INPUTS[i - 1].value != '') {
            FOUND_INPUTS[i].style.display == "block";
        }
    }

    for (let i = EXCLUDED_INPUTS.length - 1; i > 0; i++) {
        if (EXCLUDED_INPUTS[i].value == '' && EXCLUDED_INPUTS[i - 1].value == '') {
            EXCLUDED_INPUTS[i].style.display == "none";
        }
        else if (EXCLUDED_INPUTS[i].value == '' && EXCLUDED_INPUTS[i - 1].value != '') {
            EXCLUDED_INPUTS[i].style.display == "block";
        }
    }
}

function setWordSize(size) {
    wordSize = size;

    switch (size) {
        case 2:
            words = words_2;
            break;
        case 3:
            words = words_3;
            break;
        case 4:
            words = words_4;
            break;
        case 5:
            words = words_5;
            break;
        case 6:
            words = words_6;
            break;
        case 7:
            words = words_7;
            break;
        case 8:
            words = words_8;
            break;
    }

    KNOWN_INPUTS.forEach(function (input, index) {
        if (index < wordSize)
            input.style.display = "block";
        else input.style.display = "none";
    });
}
function getSuggestions() {
    const KNOWN = knownToString();
    const FOUND = FOUND_INPUTS.map(function (input) { return input.value }).join("");
    const EXCLUDED = EXCLUDED_INPUTS.map(function (input) { return input.value }).join("");

    updateSuggestions(get_suggestions(KNOWN, FOUND, EXCLUDED, words));
}
function updateSuggestions(suggestions) {
    getSuggestionElems().forEach(function (elem, index) {
        if (index < suggestions.length) {
            elem.style.display = "block";
            elem.innerText = suggestions[index];
        }
        else elem.style.display = "none";
    });
}

function knownToString() {
    let word = "";
    KNOWN_INPUTS.slice(0, wordSize).forEach(function (input) {
        word += (input.value != '' ? input.value : ' ').toLowerCase();
    });
    return word;
}