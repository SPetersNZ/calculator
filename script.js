let equation = "";
let answer = "";
let firstString = "";
let secondString = "";
const mathOperations = ["÷", "-", "×", "+"];
const mathOperationsSplit = /[÷\-×+]/;
const equalSign = "=";
const numbers = ".0123456789";

const numButton = document.querySelectorAll(".numPad");
const operationButton = document.querySelectorAll(".operation");
const equationLine = document.querySelector("#equationLine");
const answerLine = document.querySelector("#answerLine");
const plusButton = document.querySelector("#plus");
const minusButton = document.querySelector("#minus");
const divideButton = document.querySelector("#divide");
const timesButton = document.querySelector("#times");
const clearButton = document.querySelector("#clearButton");
const deleteButton = document.querySelector("#deleteButton");

clearButton.addEventListener("click", clearCalculator);
deleteButton.addEventListener("click", deleteInput);

[... numButton, ...operationButton].forEach((button) => {
    button.addEventListener("click", getInput);
});

function getInput (e) {
    var element = e.target;
    var text = element.innerText;
    if (mathOperations.includes(text) || equalSign.includes(text)) {
        e.target.value = "true";
    }
    operate(e);
};

function operate(e) {
    var element = e.target;
    var text = element.innerText;
    equalSignCheck = checkForMathOperators(equation, equalSign);
    multipleOperatorsCheck = multipleMathOperators(equation + text, mathOperations);
    if (text === equalSign && (equalSignCheck)) {
        //  do nothing
        return;
    }
    if (text === equalSign && (!(equalSignCheck))) {
        createEquationArray();
    }
    if (multipleOperatorsCheck > 1) {
        if (multipleOperatorsCheck > 1 && (equalSignCheck)) {
            continueCalculation(answer, e);
            equation = answer + text;
            equationLine.innerText = equation;
        } else {
            equationCheck = equation + text;
            let lastOperator = equationCheck
                .split("")
                .slice(equationCheck.length - 1);
            let cleanedEquation = equation
                .split("")
                .slice(0, equationCheck.length - 1)
                .join("");
            equation = cleanedEquation;
            createEquationArray();
            equation = answer + lastOperator
            equationLine.innerText = equation;
        }
    } else if (answerLine.innerText.length > 0 && (equalSignCheck)) {
        continueCalculation(answer, e);
        equation = answer + text;
        equationLine.innerText = equation;
    } else {
        equation = equation + text;
        equationLine.innerText = equation;
    }
}

function createEquationArray() {
    let equationArray = equation.split(mathOperationsSplit);
    firstString = equationArray[0];
    secondString = equationArray[1];
    answer = runCalculation(firstString, secondString);
    updateAnswerLine(answer);
};

function runCalculation(firstString, secondString) {
    var text = whatMathOperator();
    let answer;

    switch(text) {
        case "+":
            answer = Number(firstString) + Number(secondString);
            plusButton.value = "false";
            break;
        case "-":
            answer = Number(firstString) - Number(secondString);
            minusButton.value = "false";
            break;
        case "÷":
            answer = Number(firstString) / Number(secondString);
            divideButton.value = "false";
            break;
        case "×":
            answer = Number(firstString) * Number(secondString);
            timesButton.value = "false";
            break;
        default:
            console.log("Error");
            break;
    }
    return answer;
};

function updateAnswerLine(str) {
    lineUpdate = str;
    answerLine.innerText = lineUpdate;
}

function continueCalculation(answer, e) {
    var element = e.target;
    var text = element.innerText;
    answerLine.innerText = "";
    equationLine.innerText = answer + text;
}

function checkForMathOperators(str, chars) {
    for (let char of chars) {
        if (str.includes(char)) {
            return true;
        }
    }
    return false;
};

function whatMathOperator() {
    let text = equation;
    let index = -1;
    for (let operator of mathOperations) {
        index = text.indexOf(operator);
        if (index !== -1) {
            break;
        }
    }
    let result = text.slice(index, index + 1);
    return result;
};

function multipleMathOperators(str, chars) {
    let value = 0;
    for (let char of chars) {
        let count = 0;
        if (str.includes(char)) {
            for (let i = 0; i < str.length; i++) {
                if (str[i] === char) {
                    count++;
                }
            }
            value += count;
        }
    }
    return value;
};

function clearCalculator() {
    equation = "";
    answer = "";
    firstString = "";
    secondString = "";
    equationLine.innerText = "";
    answerLine.innerText = "";
    //  how to target all buttons at once?
    //  operationButton.value = "false";
    plusButton.value = "false";
    minusButton.value = "false";
    divideButton.value = "false";
    timesButton.value = "false";
};

function deleteInput() {
    let str = equation;
    str = str
        .split("")
        .slice(0, str.length - 1)
        .join("");
    equationLine.innerText = str;
    equation = str;
    console.log(str);
}