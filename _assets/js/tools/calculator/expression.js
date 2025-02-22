export class NumericalExpressions {
    static EvaluateExpresso(expression) {
        if (!expression || expression.trim().length === 0) {
            throw new Error("ERR SYNTAX");
        }

        expression = expression.replace(/\s+/g, "");
        expression = expression.replace(/%/g, "/100");

        const numbers = [];
        const operators = [];

        let i = 0;
        while (i < expression.length) {
            const character = expression[i];

            if (
                !isNaN(character) ||
                character === "." ||
                (character === "-" &&
                    (i === 0 ||
                        expression[i - 1] === "(" ||
                        this.IsOperator(expression[i - 1])))
            ) {
                let numberString = "";
                let isNegative = false;
                if (character === "-") {
                    isNegative = true;
                    i++;
                }

                while (!isNaN(expression[i]) || expression[i] === ".") {
                    numberString += expression[i];
                    i++;
                }
                i--;

                const number = parseFloat(numberString);
                if (isNaN(number)) {
                    throw new Error("ERR SYNTAX");
                }
                numbers.push(isNegative ? -number : number);
            } else if (character === "√") {
                if (expression[i + 1] !== "(") {
                    throw new Error("ERR SYNTAX");
                }
                i++;

                let expressionPartial = "";
                let openParentheses = 0;
                i++;

                while (i < expression.length) {
                    if (expression[i] === "(") {
                        openParentheses++;
                    } else if (expression[i] === ")") {
                        if (openParentheses === 0) break;
                        openParentheses--;
                    }
                    expressionPartial += expression[i];
                    i++;
                }

                if (expressionPartial === "") {
                    throw new Error("ERR SYNTAX");
                }

                const resultPartial = this.EvaluateExpresso(expressionPartial);
                if (resultPartial >= 0) {
                    numbers.push(Math.sqrt(resultPartial));
                } else {
                    numbers.push(
                        "±" +
                            Math.sqrt(Math.abs(resultPartial)).toFixed(9) +
                            "i"
                    );
                }
            } else if (character === "e") {
                numbers.push(Math.E);
            } else if (character === "π") {
                numbers.push(Math.PI);
            } else if (character === "x") {
                let baseNumber = numbers.pop();
                if (isNaN(baseNumber)) {
                    throw new Error("ERR SYNTAX");
                }

                if (expression[i + 1] === "1" && expression[i + 2] === "0") {
                    i += 3;
                } else {
                    throw new Error("ERR SYNTAX");
                }

                let exponentString = "";
                let isNegativeExponent = false;

                if (expression[i] === "-") {
                    isNegativeExponent = true;
                    i++;
                }

                while (!isNaN(expression[i])) {
                    exponentString += expression[i];
                    i++;
                }

                const exponent = parseFloat(exponentString);
                if (isNaN(exponent)) {
                    throw new Error("ERR SYNTAX");
                }

                const result =
                    baseNumber *
                    Math.pow(10, isNegativeExponent ? -exponent : exponent);
                numbers.push(result);
            } else if (character === "(") {
                operators.push(character);
            } else if (character === ")") {
                while (
                    operators.length > 0 &&
                    operators[operators.length - 1] !== "("
                ) {
                    this.PerformOperation(numbers, operators);
                }

                if (operators.length === 0 || operators.pop() !== "(") {
                    throw new Error("ERR SYNTAX");
                }
            } else if (this.IsOperator(character)) {
                while (
                    operators.length > 0 &&
                    operators[operators.length - 1] !== "(" &&
                    this.GetPrecedence(character) <=
                        this.GetPrecedence(operators[operators.length - 1])
                ) {
                    this.PerformOperation(numbers, operators);
                }

                operators.push(character);
            } else {
                throw new Error("ERR SYNTAX");
            }

            i++;
        }

        while (operators.length > 0) {
            if (
                operators[operators.length - 1] === "(" ||
                operators[operators.length - 1] === ")"
            ) {
                throw new Error("ERR SYNTAX");
            }
            this.PerformOperation(numbers, operators);
        }

        if (numbers.length !== 1) {
            throw new Error("ERR SYNTAX");
        }

        return numbers.pop();
    }

    static PerformOperation(numbers, operators) {
        if (numbers.length < 2 || operators.length < 1) {
            throw new Error("ERR SYNTAX");
        }

        const num2 = numbers.pop();
        const num1 = numbers.pop();
        const operator = operators.pop();
        const result = this.ApplicationOperation(num1, num2, operator);
        numbers.push(result);
    }

    static ApplicationOperation(num1, num2, operator) {
        switch (operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
            case "×":
                return num1 * num2;
            case "/":
            case "÷":
                if (num2 === 0) {
                    throw new Error("ERR DIVBYZERO");
                }
                return num1 / num2;
            case "^":
                return Math.pow(num1, num2);
            default:
                throw new Error("ERR SYNTAX");
        }
    }

    static IsOperator(character) {
        return (
            character === "+" ||
            character === "-" ||
            character === "*" ||
            character === "×" ||
            character === "/" ||
            character === "÷" ||
            character === "^" ||
            character === "%" ||
            character === "√" ||
            character === "e"
        );
    }

    static GetPrecedence(operator) {
        switch (operator) {
            case "+":
            case "-":
                return 1;
            case "*":
            case "×":
            case "/":
            case "÷":
                return 2;
            case "^":
                return 3;
            default:
                return 0;
        }
    }
}
