let firstString = "";

const button = document.querySelectorAll(".numPad");
const answerLine = document.querySelector("#answerLine");

button.forEach((button) => {
    button.addEventListener("click", updateString);
});

function updateString (e) {
    var element = e.target;
    var text = element.innerText;
    firstString = firstString + text;
    updateDisplay(firstString);
};

function updateDisplay(text) {
    answerLine.innerText = firstString;
};