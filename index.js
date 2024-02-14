import init, { get_suggestions } from "./pkg/wordle_guide.js";



init().then(function () { console.log("WASM loaded!") });
setupWordsLists().then(function () { console.log("Words fetched!") });


const KNOWN_INPUTS = Array(...document.getElementsByClassName("known"));
const FOUND_INPUTS = Array(...document.getElementsByClassName("found"));
const EXCLUDED_INPUTS = Array(...document.getElementsByClassName("excluded"));
const SUGGESTION_ELEMS = Array(...document.getElementsByClassName("suggestion"));
const MAX_SUGGESTIONS = 20;
var wordSize = 8;
var words_2 = [];
var words_3 = [];
var words_4 = [];
var words_5 = [];
var words_6 = [];
var words_7 = [];
var words_8 = [];
var words = words_8;


document.addEventListener("DOMContentLoaded", setupButtons);
document.addEventListener("DOMContentLoaded", setupInputs);
document.addEventListener("DOMContentLoaded", setupSuggestions);

async function setupWordsLists() {
    const RESPONSE = await fetch("words_dictionary.txt");
    const WORDS = await RESPONSE.text();

    const ALL_WORDS = WORDS.split("\n");
    words_2 = ALL_WORDS.filter(function (word) { return word.length == 2 });
    words_3 = ALL_WORDS.filter(function (word) { return word.length == 3 });
    words_4 = ALL_WORDS.filter(function (word) { return word.length == 4 });
    words_5 = ALL_WORDS.filter(function (word) { return word.length == 5 });
    words_6 = ALL_WORDS.filter(function (word) { return word.length == 6 });
    words_7 = ALL_WORDS.filter(function (word) { return word.length == 7 });
    words_8 = ALL_WORDS.filter(function (word) { return word.length == 8 });
}

function setupButtons() {
    const BUTTONS = document.getElementsByClassName("word-size-button");
    Array(...BUTTONS).forEach(function (button, index) {
        button.addEventListener("click", function () {
            setWordSize(index + 2);
            getSuggestions();
        })
    });
}

function inputResize(inputs) {
    if (inputs[inputs.length - 1].value != '') {
        const NEW_NODE = document.createElement("input");
        NEW_NODE.classList = ["found", "letter-input"];
        NEW_NODE.type = "text";
        NEW_NODE.maxLength = 1;
        inputs[inputs.length - 1].parentNode.appendChild(NEW_NODE);
        inputs.push(NEW_NODE);
    }
    else if (inputs[inputs.length - 1].value == '' &&
        inputs[inputs.length - 2].value == '') {
        inputs[inputs.length - 1].parentNode.removeChild(inputs[inputs.length - 1]);
        inputs.pop();
    }
}

function setupInputs() {
    const addSuggestionsEvent = function (inputs) {
        inputs.forEach(function (input) {
            input.addEventListener("change", getSuggestions);
        });
    };
    const addResizeEvent = function (inputs) {
        inputs.forEach(function (input) {
            input.addEventListener("change", function () {
                inputResize(inputs);
            });
        });
    };

    addSuggestionsEvent(KNOWN_INPUTS);
    addSuggestionsEvent(FOUND_INPUTS);
    addSuggestionsEvent(EXCLUDED_INPUTS);

    addResizeEvent(FOUND_INPUTS);
    addResizeEvent(EXCLUDED_INPUTS);
}

function setupSuggestions() {
    const SUGGESTION_DIV = document.getElementById("suggestions");
    for (let i = 0; i < MAX_SUGGESTIONS; i++) {
        const SUGGESTION_NODE = document.createElement("span");
        SUGGESTION_NODE.className = "suggestion";
        SUGGESTION_DIV.appendChild(SUGGESTION_NODE);
    }
}

function showHideInputs(inputs) {
    inputs.forEach(function (input, index) {
        if (index < size)
            input.style.display = "block";
        else input.style.display = "none";
    });
};

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

    showHideInputs(KNOWN_INPUTS);
    showHideInputs(FOUND_INPUTS);
    showHideInputs(EXCLUDED_INPUTS);
}

function inputsToString(inputs) {
    let word = "";
    inputs.slice(0, wordSize).forEach(function (input) {
        word += (input.value != '' ? input.value : ' ').toLowerCase();
    });
    return word;
}

function getSuggestions() {
    const KNOWN = inputsToString(KNOWN_INPUTS);
    const FOUND = inputsToString(FOUND_INPUTS);
    const EXCLUDED = inputsToString(EXCLUDED_INPUTS);

    updateSuggestions(get_suggestions(KNOWN, FOUND, EXCLUDED, words));
}

function updateSuggestions(suggestions) {
    SUGGESTION_ELEMS.forEach(function (elem, index) {
        if (index < suggestions.length) {
            elem.style.display = "block";
            elem.innerText = suggestions[index];
        }
        else elem.style.display = "none";
    });
}