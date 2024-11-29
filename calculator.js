
let firstOperand = [];
let operator = null;
let secondOperand = [];


const ADD = 0;
const SUB = 1;
const MULT = 2;
const DIV = 3;
const EQUALS = 4;


const numpad = document.querySelector("#numpad");


const topDisplay = document.querySelector("#topDisplay");
const mainDisplay = document.querySelector("#MainDisplay");


numpad.addEventListener("click", function(e){
    
    ButtonEvent(e);
});

function ButtonEvent(event){
    switch(event.target.dataset.type){
        case "operand":
            OperandEvent(event.target);
            break;
        case "operation":
            
            break;
        case "util":

            break;
    }
}



function OperandEvent(cell){
    let currentOperand = getCurrentOperand();
    switch(cell.id){
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


function SignSwitch(currentOperand){
    if(currentOperand.length < 2){
        return;
    }
    if(currentOperand[0] == '+'){
        currentOperand[0] = '-';
    }
    else{
        currentOperand[0] = '+';
    }
    updateMainDisplay(currentOperand);
}

function ZeroOperation(currentOperand){
    if(operator == EQUALS){
        ClearAllButton();
    }
    if(currentOperand.length < 2){
        return;
    }
    currentOperand.push('0');
    updateMainDisplay(currentOperand);
}

function DecimalOperation(currentOperand){
    if(operator == EQUALS){
        ClearAllButton();
    }
    if(currentOperand.includes('.')){
        return;
    }
    if(currentOperand.length < 1){
        currentOperand.push('+', '0', '.');
        updateMainDisplay(currentOperand);
        return;
    }
    currentOperand.push('.');
    updateMainDisplay(currentOperand);
}

function NumberOperation(currentOperand, numString){
    if(operator == EQUALS){
        ClearAllButton();
    }
    if(currentOperand.length < 1){
        currentOperand.push('+');
    }
    currentOperand.push(numString);
    updateMainDisplay(currentOperand);
}


function OperationEvent(cell){
    const buttonPressed = cell.id;
    switch(buttonPressed){
        case "addition":

            break;
        case "subtract":
            //
            break;
        case "multiply":
            //
            break;
        case "division":
            //
            break;
        case "equals":
            //
            break;
    }
}

function EqualsOperation(){
    if(!operator){
        updateTopDisplay(`${firstOperand}=`);
        currentOperand
    }
}

function AdditionOperation(){

}


function getCurrentOperand(){
    if(!operator || operator==EQUALS){
        return firstOperand;
    }
    return secondOperand;
}


function updateMainDisplay(currentOperand){
    currentFloat = parseFloat(currentOperand.join(''));
    if(currentOperand[currentOperand.length-1] == '.'){
        mainDisplay.textContent = `${currentFloat}.`;
    }
    else{
        mainDisplay.textContent = currentFloat;
    }
}

function updateTopDisplay(displayString){
    topDisplay.textContent(displayString);
}

function ClearAllButton(){
    ClearAll();
    topDisplay.textContent = "";
    mainDisplay.textContent = "0";
}

function ClearAll(){
    firstOperand = [];
    operator = null;
    secondOperand = [];
}

function ClearCurrent(){

}



