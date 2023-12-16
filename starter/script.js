// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];


let userChoice = {
    sCharacters: [false, specialCharacters],
    lowerCase: [false, lowerCasedCharacters],
    upperCase: [false, upperCasedCharacters],
    numeric: [false, numericCharacters],
    optionsArray: [],
    userPassword: [],
}

let passwordLength;


// Function to prompt user for password options
function getPasswordOptions() {

    passwordLength = parseInt(prompt("How long would you want your password to be?"));
    let correctLength = false;

    // unntil user provides valid password length loop will re-ask to enter correct number.
    while (!correctLength) {

        if (passwordLength >= 8 && passwordLength <= 128) {
            correctLength = true; 
        } else if (isNaN(passwordLength)) {
            alert("You did not put the length of you password. Please choose between 8 and 128");
            passwordLength = parseInt(prompt("How long would you want your password to be?"));
        } else {
            alert("Password must be between 8 and 128 characters. Choose the length between these numebers.")
            passwordLength = parseInt(prompt("How long would you want your password to be?"));
        }
    }
    
    
    
    //This prompts evaluates to true or false based on what user choose. Ok or Cancel.
    userChoice.lowerCase[0] = confirm("Do you want your password to include lowercase?\nChoose YES (OK) / NO (CANCEL)");
    userChoice.upperCase[0] = confirm("Do you want your password to include uppercase?\nChoose YES (OK) / NO (CANCEL)");
    userChoice.numeric[0] = confirm("Do you want your password to have numeric values?\nChoose YES (OK) / NO (CANCEL)");
    userChoice.sCharacters[0] = confirm("Do you want to include special characters in your password?\nChoose YES (OK) / NO (CANCEL)");
        
    
}
// Create array based on user choices
function userArray(obj) {
    let optionsSelected = false;

    for (key in obj) {
        if (obj[key][0]) {
            obj["optionsArray"] = obj["optionsArray"].concat(...obj[key][1]);
            optionsSelected = true;
        }
    }

    if (!optionsSelected ) {
        alert("You did not choose any option for the password! Make sure this time you choose at least 1 option otherwise you won't be able to generate your password.")
        getPasswordOptions();
        userArray(obj);
    }
}


// Function for getting a random element from an array
function getRandom(arr) {
   let randomElement = arr[Math.floor(Math.random() * arr.length)];
   return randomElement;
}

// Function to generate password with user input
function generatePassword() {

    //We reset userPassword to empty array.
    userChoice.userPassword = [];
    let n = 0;

    while (n < passwordLength) {
        userChoice.userPassword.push(getRandom(userChoice.optionsArray));
        n++;
    }
    return userChoice.userPassword.join("");
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector('#password');

    passwordText.value = password;
    
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

getPasswordOptions();
userArray(userChoice);


