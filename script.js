const screen = document.getElementById("number-input");
const result = document.getElementById("result");

let firstNumber = "";
let operation = "";
let secondNumber = "";


// ====================
// NUMBER BUTTONS
// ====================

function getNumber(number) {

    if (operation !== "") {
        secondNumber += number;
    } else {
        firstNumber += number;
    }

    updateScreen();
}


// ====================
// UPDATE SCREEN
// ====================

function updateScreen() {

    if (operation === "") {
        screen.textContent = firstNumber || "0";
    } else {
        screen.textContent =
            firstNumber + " " + operation + " " + secondNumber;
    }
}


// ====================
// OPERATION BUTTONS
// ====================

const operationButtons = document.querySelectorAll(".operation");

operationButtons.forEach(button => {

    button.addEventListener("click", () => {

        const op = button.textContent;


        // ====================
        // PERCENTAGE
        // ====================

        if (op === "%") {

            if (operation === "") {

                // 7 → 0.07
                const number = Number(firstNumber);
                firstNumber = (number / 100).toString();

                updateScreen();

            } else {

                // 7 + 50%
                const number = Number(secondNumber);
                secondNumber = (number / 100).toString();

                updateScreen();
            }

            return;
        }


        // ====================
        // EQUALS
        // ====================

        if (op === "=") {
            calculate();
            return;
        }


        // ====================
        // OTHER OPERATIONS
        // ====================

        if (firstNumber === "") {
            return;
        }


        // If another operation is pressed,
        // calculate the previous one first.

        if (
            operation !== "" &&
            secondNumber !== ""
        ) {

            const first = Number(firstNumber);
            const second = Number(secondNumber);

            let answer;

            switch (operation) {

                case "+":
                    answer = first + second;
                    break;

                case "-":
                    answer = first - second;
                    break;

                case "x":
                    answer = first * second;
                    break;

                case "/":

                    if (second === 0) {
                        result.textContent = "Error";
                        return;
                    }

                    answer = first / second;
                    break;
            }

            firstNumber = answer.toString();
            secondNumber = "";
        }


        operation = op;

        updateScreen();
    });
});


// ====================
// CALCULATE
// ====================

function calculate() {

    if (
        firstNumber === "" ||
        operation === "" ||
        secondNumber === ""
    ) {
        return;
    }

    const first = Number(firstNumber);
    const second = Number(secondNumber);

    let answer;


    switch (operation) {

        case "+":
            answer = first + second;
            break;

        case "-":
            answer = first - second;
            break;

        case "x":
            answer = first * second;
            break;

        case "/":

            if (second === 0) {
                result.textContent = "Error";
                return;
            }

            answer = first / second;
            break;
    }


    // Keep the calculation on the top
    screen.textContent =
        firstNumber +
        " " +
        operation +
        " " +
        secondNumber;


    // Show ONLY the result
    result.textContent = answer;


    // Store result for another calculation
    firstNumber = answer.toString();
    operation = "";
    secondNumber = "";
}


// ====================
// CLEAR
// ====================

document.querySelector(".clear").addEventListener("click", () => {

    firstNumber = "";
    operation = "";
    secondNumber = "";

    screen.textContent = "0";
    result.textContent = "";
});


// ====================
// DELETE
// ====================

document.querySelector(".delete").addEventListener("click", () => {

    if (operation === "") {

        firstNumber = firstNumber.slice(0, -1);

    } else {

        secondNumber = secondNumber.slice(0, -1);
    }

    updateScreen();
});
