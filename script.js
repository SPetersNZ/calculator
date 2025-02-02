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
    firstOperatorCheck = firstOperator(equation);
    lastOperatorCheck = lastOperator(equation);
    if (text === equalSign && (equalSignCheck)) {
        //  do nothing
        return;
    }
    if (text === equalSign && (!(equalSignCheck))) {
        createEquationArray();
    }
    if (text === mathOperations && text === lastOperatorCheck) {
        //  do nothing
        return;
    }
    if (multipleOperatorsCheck > 1) {
        if (multipleOperatorsCheck > 1 && (equalSignCheck)) {
            continueCalculation(answer, e);
            equation = answer + text;
            equationLine.innerText = equation;
        } else if (multipleOperatorsCheck > 1 && firstOperatorCheck == "-") {
            equation = equation+ text;
            equationLine.innerText = equation;
        } else {
            equationCheck = equation + text;
            let lastOperatorCheck = lastOperator(equationCheck);
            let cleanedEquation = equation
                .split("")
                .slice(0, equationCheck.length - 1)
                .join("");
            equation = cleanedEquation;
            createEquationArray();
            equation = answer + lastOperatorCheck;
            equationLine.innerText = equation;
        }
    } else if (answerLine.innerText.length > 0 && (equalSignCheck) && (multipleOperatorsCheck > 0)) {
        clearCalculator();
        equation = text;
        equationLine.innerText = equation;
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
    let firstOperatorCheck = firstOperator(equation);
    if (firstOperatorCheck == "-") {
        let subString = equation.substring(1);
        let equationArray = subString.split(mathOperationsSplit);
        firstString = "-" + equationArray[0];
        secondString = equationArray[1];
    } else {
        let equationArray = equation.split(mathOperationsSplit);
        firstString = equationArray[0];
        secondString = equationArray[1];
    }
    answer = runCalculation(firstString, secondString);
    updateAnswerLine(answer);
};

function runCalculation(firstString, secondString) {
    var text = "";
    firstOperatorCheck = firstOperator(equation);
    if (firstOperatorCheck == "-") {
        text = whatMathOperator();
    } else {
        text = whatMathOperator();
    }
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
    let firstOperatorCheck = firstOperator(equation);
    let text = equation;
    let index = -1;
    if (firstOperatorCheck == "-") {
        for (let operator of mathOperations) {
            index = text.indexOf(operator, 1);
            if (index !== -1) {
                break;
            }
        }
        let result = text.slice(index, index + 1);
        return result;
    } else {
        for (let operator of mathOperations) {
            index = text.indexOf(operator);
            if (index !== -1) {
                break;
            }
        }
        let result = text.slice(index, index + 1);
        return result;
    }
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
    equation = str;
    equationLine.innerText = equation;
};

function lastOperator(str) {
    let lastOperator = str;
    lastOperator = lastOperator
        .split("")
        .slice(lastOperator.length - 1);
    return lastOperator;
};

function firstOperator(str) {
    let firstOperator = str;
    firstOperator = firstOperator
        .split("")
        .slice(0, 1);
    return firstOperator;
};