import init, { greet } from "./pkg/wordle_guide.js";




// window.onload = function (ev) {
//     const buttons = document.getElementsByClassName("word-size-button");
//     console.log(buttons);
//     Array(...buttons).forEach(function (button, index) {
//         button.addEventListener("click", function () {
//             console.log(index + 1);
//             setWordSize(index + 1);
//         })
//     });
// }
document.addEventListener("DOMContentLoaded", function (ev) {
    const buttons = document.getElementsByClassName("word-size-button");
    console.log(buttons);
    Array(...buttons).forEach(function (button, index) {
        button.addEventListener("click", function () {
            console.log(index + 1);
            setWordSize(index + 1);
        })
    });
});





init().then(() => {
    greet("WebAssembly");
});



function setWordSize(size) {
    const letterInputs = document.getElementsByClassName("letter-input");
    Array(...letterInputs).forEach(function (input, index) {
        if (index < size)
            input.style.display = "block";
        else input.style.display = "none";
    });
}