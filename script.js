let firstString = "";
let secondString = "";
let answer = "";
let equation = "";
const mathOperations = "÷−×+";
const numbers = ".0123456789";

const numButton = document.querySelectorAll(".numPad");
const operationButton = document.querySelectorAll(".operation");
const equationLine = document.querySelector("#equationLine");
const answerLine = document.querySelector("#answerLine");
const plusButton = document.querySelector("#plus");

numButton.forEach((button) => {
    button.addEventListener("click", getInput);
});

operationButton.forEach((button) => {
    button.addEventListener("click", getInput);
});

function getInput (e) {
    var element = e.target;
    var text = element.innerText;
    if (mathOperations.includes(text)) {
        e.target.value = "true";
    }
    updateAnswerLine(text, e);
    updateEquationLine(text);
};

function updateAnswerLine(text, e) {
    var element = e.target;
    var equalsTest = element.innerText;
    if (equalsTest === "=") { 
        operate(firstString, secondString); 
    } else if (anyMathOperationsIncluded(equationLine.innerText, mathOperations)) { 
        secondString = secondString + text;
        let cleanedSecondString = secondString
            .split("")
            .filter((char) => numbers.includes(char))
            .join("");
        answerLine.innerText = cleanedSecondString;
    } else {
        firstString = firstString + text;
        let cleanedFirstString = firstString
            .split("")
            .filter((char) => numbers.includes(char))
            .join("");
        answerLine.innerText = cleanedFirstString;
    }
    console.log("First: " + firstString);
    console.log("Second: " + secondString);
    console.log("Text: " + text);
    // console.log("true/false: " + test);
};

function updateEquationLine(text) {
    equation = equation + text;
    equationLine.innerText = equation; 
}

function operate(firstString, secondString) {
    if (plusButton.value === "true") {
        answer = plus(firstString, secondString);
        answerLine.innerText = answer;
    }
};

function plus(firstString, secondString) {
    let cleanedFirstString = firstString
    .split("")
    .filter((char) => numbers.includes(char))
    .join("");
    let cleanedSecondString = secondString
    .split("")
    .filter((char) => numbers.includes(char))
    .join("");
    return Number(cleanedFirstString) + Number(cleanedSecondString);
};

function anyMathOperationsIncluded(str, chars) {
    for (let char of chars) {
        if (str.includes(char)) {
            return true;
        }
    }
    return false;
}