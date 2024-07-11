let firstString = "";
let secondString = "";
let answer = "";
let equation = "";
let addingToEquationBool = false;
const mathOperations = "÷−×+";
const equalsOperation = "=";
const numbers = ".0123456789";

const numButton = document.querySelectorAll(".numPad");
const operationButton = document.querySelectorAll(".operation");
const equationLine = document.querySelector("#equationLine");
const answerLine = document.querySelector("#answerLine");
const plusButton = document.querySelector("#plus");
// const minusButton
// const divideButton
// const timesButton
const clearButton = document.querySelector("#clearButton");

numButton.forEach((button) => {
    button.addEventListener("click", getInput);
});

operationButton.forEach((button) => {
    button.addEventListener("click", getInput);
});

clearButton.addEventListener("click", clear);

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
    var click = element.innerText;
    if (click === "=") { 
        operate(firstString, secondString); 
    } else if (anyMathOperationsIncluded(equationLine.innerText, mathOperations)) {
        if (addingToEquationBool == true) {
            addingToEquation(e);
        } else {
            secondString = secondString + text;
            let cleanedSecondString = cleanedString(secondString);
            answerLine.innerText = cleanedSecondString;
            console.log(cleanedSecondString);
        }
    } else {
        firstString = firstString + text;
        let cleanedFirstString = cleanedString(firstString);
        answerLine.innerText = cleanedFirstString;
        console.log(cleanedFirstString);
    }
};

function updateEquationLine(text) {
    equation = equation + text;
    equationLine.innerText = equation; 
};

function operate(firstString, secondString) {
    if (plusButton.value === "true") {
        answer = plus(firstString, secondString);
        answerLine.innerText = answer;
    }
};

function plus(firstString, secondString) {
    let cleanedFirstString = cleanedString(firstString);
    let cleanedSecondString = cleanedString(secondString);
    plusButton.value = "false";
    addingToEquationBool = true;
    return answer = Number(cleanedFirstString) + Number(cleanedSecondString);
};

function anyMathOperationsIncluded(str, chars) {
    for (let char of chars) {
        if (str.includes(char)) {
            return true;
        }
    }
    return false;
};

function clear() {
    firstString = "";
    secondString = "";
    answer = "";
    equation = "";
    equationLine.innerText = "";
    answerLine.innerText = "";
};

function addingToEquation(e) {
    if (anyMathOperationsIncluded(equationLine.innerText, equalsOperation)) {
        firstString = answer;
        var element = e.target;
        var text = element.innerText;
        if (text === "+") {
            equationLine.innerText = firstString + "+";
            equation = "";
            secondString = "";
            updateEquationLine(firstString);
        }
        // add lines here for minus, divide, times
        answerLine.innerText = "";
        addingToEquationBool = false;
    }
}

function cleanedString(str) {
    let cleanedString = str.toString()
    .split("")
    .filter((char) => numbers.includes(char))
    .join("");
    return cleanedString;
}