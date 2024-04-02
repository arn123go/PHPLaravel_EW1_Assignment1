const form = document.getElementById("form");
const num1 = document.getElementById("number1");
const num2 = document.getElementById("number2");
const operator = document.getElementById("operator");
const feed = document.getElementById("feedback");
const feedContainer = document.getElementById("feedContainer");

form.addEventListener("submit", calc);

function calc(event) {
  event.preventDefault();

  let validOperations = [
    "addition",
    "subtraction",
    "multiplication",
    "division",
  ];
  let error = "";
  let result = 0;
  let n1 = Number(num1.value);
  let n2 = Number(num2.value);
  // console.log(n1);
  // console.log(n2);

  if (isNaN(n1) || num1.value == '') {
    error += 'Please insert a valid number in "Number 1" slot!<br/>';
  }
  if (isNaN(n2) || num2.value == '') {
    error += 'Please insert a valid number in "Number 2" slot!<br/>';
  }
  if (validOperations.indexOf(operator.value) == -1) {
    error += "Please select an operator!";
  }
  if (operator.value == 'division' && n2 == 0 && num2.value != ''){
    error += "Cannot divide a number by zero!"
  }

  if (error) {
    feed.innerHTML = error;
    feedContainer.style.backgroundColor = '#fadbd8';
    return;
  } else {
    switch (operator.value) {
      case "addition":
        result = n1 + n2;
        break;
      case "subtraction":
        result = n1 - n2;
        break;
      case "multiplication":
        result = n1 * n2;
        break;
      case "division":
        result = n1 / n2;
        break;
    }
    feed.innerHTML = result;
    feedContainer.style.backgroundColor = 'aquamarine';
  }
}
