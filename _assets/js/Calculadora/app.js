import * as elems from "./elements.js";
import { NumericalExpressions } from "./expression.js";

const limparVisor = () => {
    elems.inputVisor.value = "";
};

const formatResult = (result) => {
    if (typeof result === "number") {
        if (Number.isInteger(result)) {
            return result.toString();
        } else {
            return parseFloat(result.toFixed(9)).toString();
        }
    } else {
        return result;
    }
};

let lastExpression = "";
let isResultGenerate = false;
const btnEqual = document.getElementById("btnEqual");
btnEqual.addEventListener("click", () => {
    let expressao = elems.inputVisor.value;
    if (expressao.includes("Ans")) {
        expressao = expressao.replace("Ans", lastExpression);
    }
    try {
        const result = NumericalExpressions.EvaluateExpresso(expressao);
        elems.inputVisor.value = formatResult(result);
        elems.inputVisor.style.textAlign = "right";
        isResultGenerate = true;
        lastExpression = expressao;
    } catch (err) {
        if (err.message === "ERR SYNTAX" || err.message === "ERR DIVBYZERO") {
            elems.inputVisor.value = err.message;
            isResultGenerate = true;
        } else {
            console.log(err.message);
        }
    }
});

elems.inputVisor.addEventListener("focus", () => {
    elems.inputVisor.style.textAlign = "left";
});

elems.inputVisor.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btnEqual.click();
    }
});

const buttons = [
    btnEqual,
    elems.btnEuler,
    elems.btnPercent,
    elems.btnSquareRoot,
    elems.btnPi,
    elems.btnEuler,
    elems.btnPower,
    elems.btnDelete,
    elems.btnParens,
    elems.btnMulti,
    elems.btnDiv,
    elems.btnAdd,
    elems.btnSubt,
    elems.btnComma,
    elems.btnSciNotation,
    elems.btnAns,
    elems.btnZero,
    elems.btnOne,
    elems.btnTwo,
    elems.btnThree,
    elems.btnFour,
    elems.btnFive,
    elems.btnSix,
    elems.btnSeven,
    elems.btnEight,
    elems.btnNine,
];

buttons.forEach((button) => {
    button.addEventListener("mousedown", (event) => {
        if (isResultGenerate && event.target !== btnEqual) {
            limparVisor();
            elems.inputVisor.focus();
            isResultGenerate = false;
        } else {
            elems.inputVisor.focus();
        }
    });
});
