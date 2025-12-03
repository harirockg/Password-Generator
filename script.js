const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const AllCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbolsstr = '~!@#$%^&*()_-+=[]{}|;:",.<>?/';


// suru mein jo value chahie
let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();

//set strength circle color to grey
setIndicator("#ccc");



//set the password length according to slider mivement
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;

    //styling of slider by sliding by creating formula
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+ "% 100%"
    

}


function setIndicator(color){
    indicator.style.backgroundColor=color;
    //shadow HW
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}



function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min; 

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
    const randNum=getRndInteger(0,symbolsstr.length);
    return symbolsstr.charAt(randNum);
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

    //to make copy span visible
    copyMsg.classList.add("active");

    // to hide the copy massege in 2 sec
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
    
}



//function for suffle the passsword
function shufflePassword(array){
    //fisher yates method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;

} 


//count checkcount
function handlecheckBoxChange(){
    checkCount=0;
    AllCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });

    //special rule/condition
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
    

}

//event listner on checkboxes
AllCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckBoxChange);
})

inputSlider.addEventListener('input',(e) =>{
    passwordLength=Number(e.target.value);
    handleSlider();
})

// if there is value in the password then copy the content or password_length is>0
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})



//generate password ka event listener
generateBtn.addEventListener('click', ()=>{
    //none of the checkbox are selectedd
    if(checkCount==0) 
        return;

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    //let's start the journey to find the new passsword
    console.log("starting the journey for the new password");

    //remove old password
    password="";

    //let's put the stuff mentioned my checkboxes

    // if(uppercase.checked){
    //     password+=generateUpperCase();
    // }

    // if(lowercase.checked){
    //     password+=generateLowerCase();
    // }

    // if(numbers.checked){
    //     password+=generateRandomNumber
    // }

    // if(symbols.checked){
    //     password+=generateSymbol();
    // }


    let funcArr=[]; // is array ke andar randonly dal diya hamne
    if(uppercase.checked)
        funcArr.push(generateUpperCase);
    
    if(lowercase.checked)
        funcArr.push(generateLowerCase);

    if(numbers.checked)
        funcArr.push(generateRandomNumber);

    if(symbols.checked)
        funcArr.push(generateSymbol);


    //compulsary addition
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }
    console.log("compulsary addition done ");


    //remaining addition
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex=getRndInteger(0,funcArr.length);
        console.log("random index done "+randIndex);
        password+=funcArr[randIndex]();
    }
    console.log("remaing addition done ");

    //suffle the password
    password=shufflePassword(Array.from(password));
    console.log("suffling  done ");

    //to show password in UI
    passwordDisplay.value=password;
    console.log("UI addition done ");

    //calculate the strength of the password
    calcStrength();

});