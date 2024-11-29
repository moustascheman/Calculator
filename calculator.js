
let firstOperand = [];
let operator = null;
let secondOperand = [];

let cachedOperator = null;
let cachedOperand = [];

const ADD = 0;
const SUB = 1;
const MULT = 2;
const DIV = 3;
const EQUALS = 4;

let errorState = 0;


const numpad = document.querySelector("#numpad");


const topDisplay = document.querySelector("#topDisplay");
const mainDisplay = document.querySelector("#MainDisplay");


numpad.addEventListener("click", function (e) {

    ButtonEvent(e);
});

function ButtonEvent(event) {
    if (errorState == 1) {
        mainDisplay.textContent = 0;
        errorState = 0;
        return;
    }
    switch (event.target.dataset.type) {
        case "operand":
            OperandEvent(event.target);
            break;
        case "operation":
            OperationEvent(event.target);
            break;
        case "util":
            UtilEvent(event.target);
            break;
    }
}



function OperandEvent(cell) {
    let currentOperand = getCurrentOperand();
    switch (cell.id) {
        case "signButton":
            SignSwitch(currentOperand);
            break;
        case "zeroButton":
            ZeroOperation(currentOperand);
            break;
        case "decimalButton":
            DecimalOperation(currentOperand);
            break;
        default:
            NumberOperation(currentOperand, cell.textContent);
            break;
    }
}


function SignSwitch(currentOperand) {
    if (currentOperand.length < 2) {
        return;
    }
    if (currentOperand[0] == '+') {
        currentOperand[0] = '-';
    }
    else {
        currentOperand[0] = '+';
    }
    updateMainDisplay(currentOperand);
}

function ZeroOperation(currentOperand) {
    if (operator == EQUALS) {
        ClearAllButton();
    }
    if (currentOperand.length < 2) {
        return;
    }
    currentOperand.push('0');
    updateMainDisplay(currentOperand);
}

function DecimalOperation(currentOperand) {
    if (operator == EQUALS) {
        ClearAllButton();
    }
    if (currentOperand.includes('.')) {
        return;
    }
    if (currentOperand.length < 1) {
        currentOperand.push('+', '0', '.');
        updateMainDisplay(currentOperand);
        return;
    }
    currentOperand.push('.');
    updateMainDisplay(currentOperand);
}

function NumberOperation(currentOperand, numString) {
    if (operator == EQUALS) {
        ClearAllButton();
        currentOperand = firstOperand;
    }
    if (currentOperand.length < 1) {
        currentOperand.push('+');
    }

    currentOperand.push(numString);
    updateMainDisplay(currentOperand);
}


function OperationEvent(cell) {
    const buttonPressed = cell.id;
    switch (buttonPressed) {
        case "addition":
            AdditionOperation();
            break;
        case "subtract":
            SubtractionOperation();
            break;
        case "multiply":
            MultiplicationOperation();
            break;
        case "division":
            DivisionOperation();
            break;
        case "equals":
            EqualsOperation();
            break;
    }
}

function EqualsOperation() {
    if (operator == null) {
        return;
    }
    if (operator == EQUALS) {
        EqualsOperationLogic(firstOperand, cachedOperand, cachedOperator);
        operator = EQUALS;
        return;
    }

    if (secondOperand.length < 1) {
        secondOperand = firstOperand;
    }
    EqualsOperationLogic(firstOperand, secondOperand, operator);
    operator = EQUALS;
}

function EqualsOperationLogic(operand1, operand2, op) {
    const firstFloat = parseFloat(operand1.join(''));
    const secondFloat = parseFloat(operand2.join(''));
    let topDisplayString;
    let result;
    switch (op) {
        case ADD:

            topDisplayString = `${firstFloat} + ${secondFloat} =`;
            result = firstFloat + secondFloat;
            OperationCleanup(topDisplayString, result);
            break;
        case SUB:
            topDisplayString = `${firstFloat} - ${secondFloat} =`;
            result = firstFloat - secondFloat;
            OperationCleanup(topDisplayString, result);
            break
        case MULT:
            topDisplayString = `${firstFloat} × ${secondFloat} =`;
            result = firstFloat * secondFloat;
            OperationCleanup(topDisplayString, result);
            break
        case DIV:
            if (secondFloat == 0) {
                return dividedByZeroError();
            }
            topDisplayString = `${firstFloat} ÷ ${secondFloat} =`;
            result = firstFloat / secondFloat;
            OperationCleanup(topDisplayString, result);
            break
    }
}



function OperationCleanup(topDisplayString, result) {
    topDisplay.textContent = topDisplayString;
    mainDisplay.textContent = result;
    cachedOperator = operator;
    operator = null;
    let resultArr = (`${result}`).split('');
    if (!(resultArr[0] == '-' || resultArr[0] == '+')) {
        resultArr.unshift('+');
    }
    firstOperand = resultArr;
    cachedOperand = secondOperand;
    secondOperand = [];
}

function dividedByZeroError() {
    errorState = 1;
    firstOperand = [];
    secondOperand = [];
    cachedOperand = [];
    operator = null;
    cachedOperator = null;
    topDisplay.textContent = "";
    mainDisplay.textContent = "You Cannot Divide by Zero!";
}

function AdditionOperation() {

    if (secondOperand.length > 0) {
        EqualsOperationLogic(firstOperand, secondOperand, operator);
    }
    operator = ADD;
    let firstFloat = parseFloat(firstOperand.join(''));
    let topDisplayString = `${firstFloat} +`;
    topDisplay.textContent = topDisplayString;
    return;
}

function SubtractionOperation() {
    if (secondOperand.length > 0) {
        EqualsOperationLogic(firstOperand, secondOperand, operator);
    }
    operator = SUB;
    let firstFloat = parseFloat(firstOperand.join(''));
    let topDisplayString = `${firstFloat} -`;
    topDisplay.textContent = topDisplayString;
    return;
}

function DivisionOperation() {
    if (secondOperand.length > 0) {
        EqualsOperationLogic(firstOperand, secondOperand, operator);
    }
    operator = DIV;
    let firstFloat = parseFloat(firstOperand.join(''));
    let topDisplayString = `${firstFloat} ÷`;
    topDisplay.textContent = topDisplayString;
    return;
}

function MultiplicationOperation() {
    if (secondOperand.length > 0) {
        EqualsOperationLogic(firstOperand, secondOperand, operator);
    }
    operator = MULT;
    let firstFloat = parseFloat(firstOperand.join(''));
    let topDisplayString = `${firstFloat} ×`;
    topDisplay.textContent = topDisplayString;
    return;
}


function getCurrentOperand() {
    if (operator == null) {
        return firstOperand;
    }
    return secondOperand;
}


function updateMainDisplay(currentOperand) {
    currentFloat = parseFloat(currentOperand.join(''));
    if (currentOperand[currentOperand.length - 1] == '.') {
        mainDisplay.textContent = `${currentFloat}.`;
    }
    else {
        mainDisplay.textContent = currentFloat;
    }
}

function updateMainDisplayString(displayString) {
    mainDisplay.textContent = displayString;
}

function updateTopDisplay(displayString) {
    topDisplay.textContent = displayString;
}

function ClearAllButton() {
    ClearAll();
    topDisplay.textContent = "";
    mainDisplay.textContent = "0";
}

function UtilEvent(cell) {
    const buttonPressed = cell.id;
    switch (buttonPressed) {
        case "ceButton":
            ClearCurrent();
            break;
        case "cButton":
            ClearAllButton();
            break;
        case "backspace":
            Backspace();
            break;
    }
}


function ClearAll() {
    firstOperand = [];
    operator = null;
    secondOperand = [];
    cachedOperand = [];
    cachedOperator = null;
}

function ClearCurrent() {
    let currentOperand = getCurrentOperand();
    while (currentOperand.length > 0) {
        currentOperand.pop();
    }
    mainDisplay.textContent = 0;
}

function Backspace() {
    let currentOperand = getCurrentOperand();
    currentOperand.pop();
    if (currentOperand.length == 1) {
        currentOperand.pop();
    }
    let operandFloat;
    if (currentOperand.length < 1) {
        operandFloat = 0;
    }
    else {
        operandFloat = parseFloat(currentOperand.join(''));
    }
    mainDisplay.textContent = operandFloat;
}




