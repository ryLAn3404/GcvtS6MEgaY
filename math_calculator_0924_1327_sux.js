// 代码生成时间: 2025-09-24 13:27:21
 * Features:
 * - Addition
 * - Subtraction
 * - Multiplication
 * - Division
 *
 * @author Your Name
 * @version 1.0
 */

// Define the MathCalculator class
class MathCalculator {
    constructor() {
        this.errorMessage = 'Invalid input. Please enter a number.';
    }

    // Add two numbers
    add(a, b) {
        return a + b;
    }

    // Subtract two numbers
    subtract(a, b) {
        return a - b;
    }

    // Multiply two numbers
    multiply(a, b) {
        return a * b;
    }

    // Divide two numbers
    divide(a, b) {
        if(b === 0) {
            throw new Error('Cannot divide by zero.');
        }
        return a / b;
    }

    // Calculate the result based on the operation and numbers
    calculate(operation, a, b) {
        try {
            switch(operation) {
                case 'add':
                    return this.add(a, b);
                case 'subtract':
                    return this.subtract(a, b);
                case 'multiply':
                    return this.multiply(a, b);
                case 'divide':
                    return this.divide(a, b);
                default:
                    throw new Error('Invalid operation.');
            }
        } catch(e) {
            return this.errorMessage;
        }
    }
}

// Function to update the result on the web page
function updateResult(result) {
    const resultElement = d3.select('#result');
    resultElement.text(result);
}

// Function to handle user input and calculate the result
function handleUserInput() {
    const operation = d3.select('#operation').node().value;
    const num1 = parseFloat(d3.select('#num1').node().value);
    const num2 = parseFloat(d3.select('#num2').node().value);
    const calculator = new MathCalculator();

    if(isNaN(num1) || isNaN(num2)) {
        updateResult(calculator.errorMessage);
        return;
    }

    const result = calculator.calculate(operation, num1, num2);
    updateResult(result);
}

// Attach the handleUserInput function to the calculate button
d3.select('#calculate').on('click', handleUserInput);
