import init, { get_suggestions } from "./pkg/wordle_guide.js";



init().then(function () { console.log("WASM loaded!") });


const KNOWN_INPUTS = Array(...document.getElementsByClassName("known"));
const FOUND_INPUTS = Array(...document.getElementsByClassName("found"));
const EXCLUDED_INPUTS = Array(...document.getElementsByClassName("excluded"));
const SUGGESTION_ELEMS = Array(...document.getElementsByClassName("suggestion"));
const MAX_SUGGESTIONS = 20;
var wordSize = 8;


document.addEventListener("DOMContentLoaded", setupButtons);
document.addEventListener("DOMContentLoaded", setupInputs);
document.addEventListener("DOMContentLoaded", setupSuggestions);

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

    updateSuggestions(get_suggestions(KNOWN, FOUND, EXCLUDED));
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