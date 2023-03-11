const inputSlider = document.querySelector('[data-lengthSlider]');
const lengthDisplay= document.querySelector('[data-lengthNumber]');
const indicator = document.querySelector('[data-indicator]');
const symbols ='!@#$%^&*()_+/*-+~<>.?/<,{}[]';

const uppercaseCheck =document.querySelector('#uppercase');
const lowercaseCheck =document.querySelector('#lowercase');
const numberCheck =document.querySelector('#numbers');
const symbolCheck =document.querySelector('#symbols');

const passwordDisplay = document.querySelector('[data-passwordDisplay]');
const copyMsg = document.querySelector('[data-copyMsg]');
const copyBtn = document.querySelector('[data-copy]');
const generateBtn = document.querySelector('.generateButton');
const allCheckBox= document.querySelectorAll('input[type=checkbox]');

//initially

let password="";
let passwordLength=10;
let checkCount =1;
handleSlider();
setIndicator("#ccc");


// to set password length we will use slider function 

function handleSlider() {
    inputSlider.value=passwordLength;
    lengthDisplay.innerText =passwordLength;
}

function setIndicator(color) {
    indicator.style.backgroundColor=color;
    // shadow

}

function getRandomInteger(min,max) {
    return Math.floor(Math.random()*(max-min)) + min ;
}

function generateRandomNumber() {
    return getRandomInteger(0,9);
}

function generateRandomLowerCase() {
    return String.fromCharCode(getRandomInteger(97,123));
}

function generateRandomUppercase() {
    return String.fromCharCode(getRandomInteger(65,90));
}

function generateRandomSymbol() {
    const randomSymbol = getRandomInteger(0,symbols.length);
    return symbols.charAt(randomSymbol);
}

function calculateStrength () {
    let upper =false;
    let lower =false;
    let number =false;
    let symbol =false;

    if(uppercaseCheck.checked) upper = true;
    if(lowercaseCheck.checked) lower = true;
    if(numberCheck.checked) number = true;
    if(symbolCheck.checked) symbol = true;

    if(upper && lower && number && symbol && passwordLength>=8) {
        setIndicator("#89fc00");
    }
    else if (
        upper && lower && (number || symbol) && passwordLength>6
    ) setIndicator("#e6c229");

    else {
        setIndicator("#ff4242");
    }

};

async function copyContent() {
try{
   await navigator.clipboard.writeText(passwordDisplay.value);
   copyMsg.innerText="copied";
}
catch {
    copyMsg.innerText="failed";
}
// to make span visible 
copyMsg.classList.add("active");

// to make that pop up removed after a speific point of time 

setTimeout(()=> {
    copyMsg.classList.remove("active");
},2000);
}

// event listener on slider

inputSlider.addEventListener('input', (e) => {
passwordLength=e.target.value;
handleSlider();

})

// event listener on copy button 

copyBtn.addEventListener('click',()=> {
    if(passwordLength>0) copyContent();
})

//  generate password 

function shuffle(array) {
    // fisher Yates Method 
 for(let i=array.length-1;i>0;i--) {
    const j = Math.floor(Math.random()*(i+1));
    const temp=array[i];
    array[i]=array[j];
    array[j]=temp;
 }
 let str="";
 array.forEach((el)=>(str+=el));
 return str;

}

function handleCheckBoxChange () {
    let checkCount =0;
    allCheckBox.forEach((checkBox)=> {
        if(checkBox.checked) 
        checkCount++;
    })
    // special condition
    if(passwordLength<checkCount) 
    passwordLength=checkCount;
    // everytime the password is changed we need to call the handleslider
    handleSlider();
}


allCheckBox.forEach((ele)=> {
    ele.addEventListener('change', handleCheckBoxChange);
})
  
generateBtn.addEventListener('click',()=>{
//  none of the checkbox is checked 
if(checkCount<=0) return;

if(passwordLength<checkCount)
 passwordLength= checkCount;
 handleSlider();


// lets start the journey to find new password 
console.log("starting the journey");

// remove old password
password="";

// lets put the stuff mentioned by checkboxes 

// if(uppercaseCheck.checked) {
//     password+=generateRandomUppercase();
// }

// if(lowercaseCheck.checked) {
//     password+=generateRandomLowerCase();
// }

// if(numberCheck.checked) {
//     password+=generateRandomNumber();
// }

// if(symbolCheck.checked) {
//     password+=generateRandomSymbol();
// }

let functionArray = [];

if(uppercaseCheck.checked) {
    functionArray.push(generateRandomUppercase);
}

if(lowercaseCheck.checked) {
    functionArray.push(generateRandomLowerCase);
}

if(numberCheck.checked) {
    functionArray.push(generateRandomNumber);
}

if(symbolCheck.checked) {
    functionArray.push(generateRandomSymbol);
}

// compulsory addition 
for(let i =0;i<functionArray.length;i++){
    password+=functionArray[i]();
}


console.log("compulsory addition done");

// remaining addition 

for(let i =0 ; i<passwordLength-functionArray.length;i++) {
    let randomIndex=getRandomInteger(0,functionArray.length);
    password+=functionArray[randomIndex]();
}

console.log("remaing addition done");

// shuffle the password 
password=shuffle(Array.from(password));
console.log("shuffling done");

// showing in UI
passwordDisplay.value=password;
console.log("UI addition done");

// calculating strength
calculateStrength();








} );

 