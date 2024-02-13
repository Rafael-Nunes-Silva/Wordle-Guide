import init, { greet } from "./pkg/hello_wasm.js";




// document.body.addEventListener("load", function (ev) {
//     document.getElementsByClassName("word-size-button")
// });





init().then(() => {
    greet("WebAssembly");
});


function setWordSize(size) {
    const letterInputs = document.getElementsByClassName("letter-input");
    letterInputs.array.forEach(function (input, index) {
        if (index <= size)
            input.style.display = "block";
        else input.style.display = "hidden";
    });
}