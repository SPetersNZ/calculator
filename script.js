const button = document.querySelectorAll(".numPad");
const answerLine = document.querySelector("#answerLine");

button.forEach((button) => {
    button.addEventListener("click", testFunction);
});

function testFunction (e) {
    var element = e.target;
    var text = element.innerText;
    answerLine.innerText = text;
};