 function add(num1, num2) {
     return num1 + num2;
 }

 function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if(num2 != 0) {
        return num1 / num2;
    }
    
    else {
        return 'No';
    }
}

function operate(num1, num2, operator){
    switch(operator) {
        case '+':
            return add(num1, num2);

        case '-':
            return subtract(num1, num2);

        case '*':
            return multiply(num1, num2);

        case '/':
            return divide(num1, num2);
        
        default:
            return alert("error");
    }
}

const btns = document.querySelectorAll('button.numbtn');
const clrbtn = document.getElementById('clrbtn');
const eqlbtn = document.getElementById('eqlbtn');
const oprbtns = document.querySelectorAll('button.oprbtn');
const decbtn = document.getElementById('decbtn');
const bkspbtn = document.getElementById('bkspbtn');

let currentValue = '';
let secondNum = '';
let firstNum;
let isNextInput = true;
let firstDec = true; //flag to prevent multiple decimals
let optr = undefined;
let lastOpp = false; //flag for whether or not the current expression is the first or second 
let eqlCheck = false; //flag for operations that only apply after pressing the equal button

btns.forEach(button => {
        button.addEventListener('click', () => {
        if(eqlCheck){
            document.getElementById('display').value = '';
            secondNum += button.textContent;
            document.getElementById('display').value = secondNum;
        }
        if(!eqlCheck){
            if(lastOpp == true) {
                document.getElementById('display').value = '';
                lastOpp = false;
            }
            currentValue = document.getElementById('display').value;
            secondNum = currentValue + button.textContent;
            document.getElementById('display').value = secondNum;
            if(isNextInput) {
            firstNum = document.getElementById('display').value;
            }
        }
    });
});

//keyboard support
document.addEventListener('keydown', (num) => {
    if(eqlCheck){
        if(num.key === '0' || num.key === '1' || num.key === '2' || num.key === '3' 
        || num.key === '4' || num.key === '5' || num.key === '6' || num.key === '7' 
        || num.key === '8' || num.key === '9') {
        document.getElementById('display').value = '';
        secondNum += num.key;
        document.getElementById('display').value = secondNum;
        }
    }

    if(!eqlCheck){
        if(num.key === '0' || num.key === '1' || num.key === '2' || num.key === '3' 
        || num.key === '4' || num.key === '5' || num.key === '6' || num.key === '7' 
        || num.key === '8' || num.key === '9') {
            if(lastOpp == true) {
                document.getElementById('display').value = '';
                lastOpp = false;
            }
            currentValue = document.getElementById('display').value;
            secondNum = currentValue + num.key;
            document.getElementById('display').value = secondNum;
            if(isNextInput) {
            firstNum = document.getElementById('display').value;
            }
        }
    }
});

clrbtn.addEventListener('click', () => {
    document.getElementById('display').value = '';
    secondNum = '';
    currentValue = '';
    firstNum = undefined;
    optr = undefined;
    isNextInput = true;
    firstDec = true;
    lastOpp = false;
    eqlCheck = false;
});

//keyboard support
document.addEventListener('keydown', (clrkey) => {
    if(clrkey.key === 'Delete'){
        document.getElementById('display').value = '';
        secondNum = '';
        currentValue = '';
        firstNum = undefined;
        optr = undefined;
        isNextInput = true;
        firstDec = true;
        lastOpp = false;
        eqlCheck = false;
    }
});

oprbtns.forEach(oprbtn => {
    oprbtn.addEventListener('click', () => {
        if(optr != undefined) {
            firstNum = operate(parseFloat(firstNum), parseFloat(secondNum), optr);
            document.getElementById('display').value = +firstNum.toFixed(4);
            lastOpp = true;
        }

        else {
            document.getElementById('display').value = '';
        }

        optr = oprbtn.innerHTML;
        secondNum = '';
        isNextInput = false;
        firstDec = true;
    });

});

//keyboard support
document.addEventListener('keydown', (oprKey) => {
    if(oprKey.key === '+' || oprKey.key === '-' || oprKey.key === '*' || oprKey.key === '/'){
        if(optr != undefined) {
            firstNum = operate(parseFloat(firstNum), parseFloat(secondNum), optr);
            document.getElementById('display').value = +firstNum.toFixed(4);
            lastOpp = true;
        }

        else {
            document.getElementById('display').value = '';
        }

        optr = oprKey.key;
        secondNum = '';
        isNextInput = false;
        firstDec = true;
    }
});

decbtn.addEventListener('click',() =>{
    if(firstDec) {
        if(eqlCheck){
            secondNum += '.';
        }
            document.getElementById('display').value += '.';
        firstDec = false;
    }
});

//keyboard support
document.addEventListener('keydown', (decKey) => {
    if(decKey.key === '.'){
        if(firstDec) {
            if(eqlCheck){
                secondNum += '.';
            }
                document.getElementById('display').value += '.';
            firstDec = false;
        }  
    }
});


bkspbtn.addEventListener('click', ()=> {
    if(!eqlCheck){
        if(document.getElementById('display').value != '') {
            if(optr != undefined) {
                secondNum = secondNum.slice(0,-1);
            }
            else{
                firstNum = firstNum.slice(0,-1);
                secondNum = secondNum.slice(0,-1);
            }
            document.getElementById('display').value = document.getElementById('display').value.slice(0,-1);
        }
    }
});

//keyboard support
document.addEventListener('keydown', (bkspKey) => {
    if(bkspKey.key === 'Backspace'){
        if(!eqlCheck){
            if(document.getElementById('display').value != '') {
                if(optr != undefined) {
                    secondNum = secondNum.slice(0,-1);
                }
                else{
                    firstNum = firstNum.slice(0,-1);
                    secondNum = secondNum.slice(0,-1);
                }
                document.getElementById('display').value = document.getElementById('display').value.slice(0,-1);
            }
        }
    }
});


eqlbtn.addEventListener('click', () => {
        let result = operate(parseFloat(firstNum), parseFloat(secondNum), optr);
        document.getElementById('display').value = +result.toFixed(4);
        eqlCheck = true;
});

//keyboard support
document.addEventListener('keydown', (eqlKey) => {
    if(eqlKey.key === '=' || eqlKey.key ==='Enter'){
        let result = operate(parseFloat(firstNum), parseFloat(secondNum), optr);
        document.getElementById('display').value = +result.toFixed(4);
        eqlCheck = true;
    }
});