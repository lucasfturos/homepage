const allowedValues = [
    "%",
    "7",
    "8",
    "9",
    "^",
    "(",
    ")",
    "4",
    "5",
    "6",
    "*",
    "/",
    "1",
    "2",
    "3",
    "+",
    "-",
    "0",
    ".",
    "s",
    "p",
];

const inputVisor = document.getElementById("inputVisor");
inputVisor.addEventListener("input", (event) => {
    let inputValue = event.target.value;
    if (inputValue.toLowerCase() === "p") {
        event.target.value = btnPi.value;
        return;
    }

    if (inputValue.toLowerCase() === "s") {
        event.target.value = btnSquareRoot.value + "(";
        parenState = 1;
        return;
    }

    let sanitizedValue = "";
    for (let char of inputValue) {
        if (allowedValues.includes(char)) {
            sanitizedValue += char;
        }
    }

    event.target.value = sanitizedValue;
});

const btnZero = document.getElementById("btnZero");
btnZero.addEventListener("click", () => {
    inputVisor.value += btnZero.value;
});

const btnOne = document.getElementById("btnOne");
btnOne.addEventListener("click", () => {
    inputVisor.value += btnOne.value;
});

const btnTwo = document.getElementById("btnTwo");
btnTwo.addEventListener("click", () => {
    inputVisor.value += btnTwo.value;
});

const btnThree = document.getElementById("btnThree");
btnThree.addEventListener("click", () => {
    inputVisor.value += btnThree.value;
});

const btnFour = document.getElementById("btnFour");
btnFour.addEventListener("click", () => {
    inputVisor.value += btnFour.value;
});

const btnFive = document.getElementById("btnFive");
btnFive.addEventListener("click", () => {
    inputVisor.value += btnFive.value;
});

const btnSix = document.getElementById("btnSix");
btnSix.addEventListener("click", () => {
    inputVisor.value += btnSix.value;
});

const btnSeven = document.getElementById("btnSeven");
btnSeven.addEventListener("click", () => {
    inputVisor.value += btnSeven.value;
});

const btnEight = document.getElementById("btnEight");
btnEight.addEventListener("click", () => {
    inputVisor.value += btnEight.value;
});

const btnNine = document.getElementById("btnNine");
btnNine.addEventListener("click", () => {
    inputVisor.value += btnNine.value;
});

const btnPercent = document.getElementById("btnPercent");
btnPercent.addEventListener("click", () => {
    inputVisor.value += btnPercent.value;
});

const btnPi = document.getElementById("btnPi");
btnPi.addEventListener("click", () => {
    inputVisor.value += btnPi.value;
});

const btnEuler = document.getElementById("btnEuler");
btnEuler.addEventListener("click", () => {
    inputVisor.value += "e";
});

const btnAllClear = document.getElementById("btnAllClear");
btnAllClear.addEventListener("click", () => {
    inputVisor.value = "";
});

const btnPower = document.getElementById("btnPower");
btnPower.addEventListener("click", () => {
    inputVisor.value += "^";
});

let parenState = 0;
const btnParens = document.getElementById("btnParens");
btnParens.addEventListener("click", () => {
    if (parenState === 0) {
        inputVisor.value += "(";
        parenState = 1;
    } else {
        inputVisor.value += ")";
        parenState = 0;
    }
});

const btnSquareRoot = document.getElementById("btnSquareRoot");
btnSquareRoot.addEventListener("click", () => {
    inputVisor.value += btnSquareRoot.value + "(";
    parenState = 1;
});

const btnMulti = document.getElementById("btnMulti");
btnMulti.addEventListener("click", () => {
    inputVisor.value += btnMulti.value;
});

const btnDiv = document.getElementById("btnDiv");
btnDiv.addEventListener("click", () => {
    inputVisor.value += btnDiv.value;
});

const btnAdd = document.getElementById("btnAdd");
btnAdd.addEventListener("click", () => {
    inputVisor.value += btnAdd.value;
});

const btnSubt = document.getElementById("btnSubt");
btnSubt.addEventListener("click", () => {
    inputVisor.value += btnSubt.value;
});

const btnComma = document.getElementById("btnComma");
btnComma.addEventListener("click", () => {
    inputVisor.value += btnComma.value;
});

const btnSciNotation = document.getElementById("btnSciNotation");
btnSciNotation.addEventListener("click", () => {
    inputVisor.value += btnSciNotation.value;
});

const btnAns = document.getElementById("btnAns");
btnAns.addEventListener("click", () => {
    inputVisor.value += "Ans";
});

const btnDelete = document.getElementById("btnDelete");
btnDelete.addEventListener("click", () => {
    const currentText = inputVisor.value;
    if (currentText === "ERR SYNTAX" || currentText === "ERR DIVBYZERO") {
        inputVisor.value = "";
    } else if (
        currentText.endsWith(btnAns.value) ||
        currentText.endsWith(btnSciNotation.value)
    ) {
        inputVisor.value = currentText.slice(0, -3);
    } else {
        inputVisor.value = currentText.slice(0, -1);
    }
});

export {
    inputVisor,
    btnPercent,
    btnSquareRoot,
    btnPi,
    btnEuler,
    btnDelete,
    btnAllClear,
    btnPower,
    btnParens,
    btnMulti,
    btnDiv,
    btnAdd,
    btnSubt,
    btnComma,
    btnSciNotation,
    btnAns,
    btnZero,
    btnOne,
    btnTwo,
    btnThree,
    btnFour,
    btnFive,
    btnSix,
    btnSeven,
    btnEight,
    btnNine,
};
