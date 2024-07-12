let firstString = "";
let secondString = "";
let answer = "";
let equation = "";
let addingToEquationBool = false;
const mathOperations = "÷-×+";
const equalSign = "=";
const numbers = ".0123456789";

const numButton = document.querySelectorAll(".numPad");
const operationButton = document.querySelectorAll(".operation");
const equationLine = document.querySelector("#equationLine");
const answerLine = document.querySelector("#answerLine");
const plusButton = document.querySelector("#plus");
const minusButton = document.querySelector("#minus");
// const divideButton
// const timesButton
const clearButton = document.querySelector("#clearButton");

//  how to combine numButton && operationButton into single line?
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
    mathOperationsCheck = anyMathOperationsIncluded(equationLine.innerText, mathOperations);
    //  tidy if statements into => operations
    if (click === "=") { 
        operate(firstString, secondString);
    } else if (mathOperationsCheck.firstValue) {
        if (addingToEquationBool == true) {
            addingToEquation(e);
        } else {
            secondString = secondString + text;
            let cleanedSecondString = cleanedString(secondString);
            answerLine.innerText = cleanedSecondString;
        }
    } else {
        firstString = firstString + text;
        let cleanedFirstString = cleanedString(firstString);
        answerLine.innerText = cleanedFirstString;
    }
};

function updateEquationLine(text) {
    //  tidy if statements into => operations
    equalSignCheck = anyMathOperationsIncluded(equationLine.innerText, equalSign); 
    if (equalSignCheck.firstValue) {
        //  do nothing
    } else {
        equation = equation + text;
        equationLine.innerText = equation; 
    }
    console.log(equationLine.innerText);
    mathOperationsCheck = anyMathOperationsIncluded(equationLine.innerText, mathOperations);
    if (mathOperationsCheck.secondValue > 1) {
        operate(firstString, secondString);
        //  answer below needs to include the clicked operation
        //  i.e. 98 + 2 +
        //  100 (does not enter + again to symbolize second + above)
        //  must also ensure that the button.value is true
        equationLine.innerText = answer;
        answerLine.innerText = "";
    }
};

function operate(firstString, secondString) {
    //  tidy if statements into => operations
    if (plusButton.value === "true") {
        answer = plus(firstString, secondString);
        answerLine.innerText = answer;
    }
    if (minusButton.value === "true") {
        answer = minus(firstString, secondString);
        answerLine.innerText = answer;
    }
    //  add checks here for other math operations
};

function plus(firstString, secondString) {
    let cleanedFirstString = cleanedString(firstString);
    let cleanedSecondString = cleanedString(secondString);
    plusButton.value = "false";
    addingToEquationBool = true;
    return answer = Number(cleanedFirstString) + Number(cleanedSecondString);
};

function minus(firstString, secondString) {
    cleanedFirstString = cleanedString(firstString);
    cleanedSecondString = cleanedString(secondString);
    minusButton.value = "false";
    addingToEquationBool = true;
    return answer = Number(cleanedFirstString) - Number(cleanedSecondString);
};

// add functions here for minus, divide, times

function anyMathOperationsIncluded(str, chars) {
    let firstValue = false;
    let secondValue = 0;
    for (let char of chars) {
        let count = 0;
        if (str.includes(char)) {
            firstValue = true;
            for (let i = 0; i < str.length; i++) {
                if (str[i] === char) {
                    count++;
                }
            }
            secondValue += count;
        }
    }
    return { firstValue, secondValue };
};

function clear() {
    firstString = "";
    secondString = "";
    cleanedFirstString = "";
    cleanedSecondString = "";
    answer = "";
    equation = "";
    addingToEquationBool = false;
    equationLine.innerText = "";
    answerLine.innerText = "";
    //  reset button values to false
    plusButton.value = "false";
    minusButton.value = "false";
    //  how to target all buttons at once?
    //  operationButton.value = "false";
};

function addingToEquation(e) {
    //  tidy if statements into => operations
    equalSignCheck = anyMathOperationsIncluded(equationLine.innerText, equalSign);
    mathOperationsCheck = anyMathOperationsIncluded(equationLine.innerText, mathOperations);
    if (equalSignCheck.firstValue) {
        firstString = answer;
        var element = e.target;
        var text = element.innerText;
        //  can below sections be passed through a function?
        if (text === "+") {
            equationLine.innerText = firstString + "+";
            equation = "";
            secondString = "";
            updateEquationLine(firstString);
        }
        if (text === "-") {
            equationLine.innerText = firstString + "-";
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