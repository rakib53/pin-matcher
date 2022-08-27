const buttons = document.querySelectorAll(".button");
const verifyPin = document.getElementById("verify-pin");
let attemptLeft = 3;
const attempt = document.getElementById("attempt");
const actionLeft = document.querySelector(".action-left");
const clearButton = document.getElementById("clearButton");

// const getInputValue = (element) => {
//      const inputElement = document.getElementById(element);
//      const inputValue = inputElement.value;
//      const inputValueNumber = parseInt(inputValue);
//      return inputValueNumber;
// };

const setInputValue = (element) => {
     const input = document.getElementById(element);
     const inputValue = input.value;
     const inputValueNumber = parseInt(inputValue);
     return inputValueNumber;
};

for (const button of buttons) {
     button.addEventListener("click", function (event) {
          const targetValue = event.target.innerText;
          const theTypeaValue = document.getElementById("typed-numbers");
          const inputValue = theTypeaValue.value;
          const newValue = inputValue + targetValue;
          const finout = setInputValue("display-pin");
          const noPin = document.getElementById("not-pin");

          if (isNaN(finout)) {
               noPin.style.display = "block";

               setTimeout(() => {
                    noPin.style.display = "none";
               }, 1000);
               return;
          } else {
               if (targetValue === "C") {
                    theTypeaValue.value = "";
               } else if (targetValue === "<") {
                    const lessValue = newValue.substring(
                         0,
                         newValue.length - 2
                    );
                    theTypeaValue.value = lessValue;
                    return;
               } else {
                    console.log(targetValue);
                    theTypeaValue.value = newValue;
               }
          }
     });
}

verifyPin.addEventListener("click", () => {
     const typedNumber = setInputValue("typed-numbers");
     const displayPin = setInputValue("display-pin");
     const pinSuccess = document.getElementById("pin-success");
     const pinWrong = document.getElementById("pin-failure");

     if (attemptLeft <= 0) {
          verifyPin.disable = "true";
          verifyPin.style.backgroundColor = "#b3b3b3";
          attemptLeft = 0;
          actionLeft.innerText = "You Haven't attempt left!";

          return;
     } else {
          if (displayPin === typedNumber) {
               pinSuccess.style.display = "block";
               setTimeout(() => {
                    pinSuccess.style.display = "none";
               }, 2000);
               attemptLeft = 3;
          } else {
               pinWrong.style.display = "block";
               setTimeout(() => {
                    pinWrong.style.display = "none";
               }, 2000);
               attemptLeft--;
          }
     }
     attempt.innerText = attemptLeft;
});

const getPin = () => {
     const randomNumber = getRandomNumber();
     const getStringPin = randomNumber + "";
     const piLength = getStringPin.length;
     if (piLength === 4) {
          return randomNumber;
     } else {
          return getPin();
     }
};

document.getElementById("generate-pin").addEventListener("click", function () {
     const thePin = getPin();
     document.getElementById("display-pin").value = thePin;
});

const getRandomNumber = () => {
     const randomNumber = Math.round(Math.random() * 10000);
     return randomNumber;
};
