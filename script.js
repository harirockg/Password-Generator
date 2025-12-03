const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("data-passwordDisplay");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const AllCheckBox = document.querySelectorAll("input[type=checkbox]");

// let lengthDisplay = document.querySelector('[lengthDisplay');
// let slider = document.querySelector('input[type=range]');

const symbols = '~!@#$%^&*()_-+=[]{}|;:",.<>?/';


let password="";
let passwordLength=10;
let checkCount=1;
handleSlider();

//set strength circle color to grey




//set the password length according to slider mivement
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}


function setIndicator(color){
    indicator.style=backgroundColor=color;
    //shadow HW
}



function getRndInteger(min,max){
    Math.float(Math.random() * (max-min)) + min; 

}


function generateRandomNumber(){
    return getRndInteger(0,9);

}


function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123)); // asqii valuefor a,z
}


function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91)); // asqii valuefor a,z
}

function generateSymbol(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (uppercase.checked) hasUpper = true;
    if (lowercase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbols.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 10) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 5
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}


async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";

    }
    catch(e){
        copyMsg.innerText="Failed";
    }
    copyMsg.classList.add("active");
    
}