package com.example.calculator.service;

import org.springframework.stereotype.Service;

/**
 * Service class that handles calculator operations
 */
@Service
public class CalculatorService {

    /**
     * Performs a calculation based on the provided operation
     * 
     * @param operand1 First operand
     * @param operand2 Second operand
     * @param operation The operation to perform (add, subtract, multiply, divide)
     * @return The result of the calculation
     * @throws IllegalArgumentException if the operation is not supported
     * @throws ArithmeticException if division by zero is attempted
     */
    public double calculate(double operand1, double operand2, String operation) {
        switch (operation.toLowerCase()) {
            case "add":
                return add(operand1, operand2);
            case "subtract":
                return subtract(operand1, operand2);
            case "multiply":
                return multiply(operand1, operand2);
            case "divide":
                return divide(operand1, operand2);
            default:
                throw new IllegalArgumentException("Unsupported operation: " + operation);
        }
    }

    private double add(double a, double b) {
        return a + b;
    }

    private double subtract(double a, double b) {
        return a - b;
    }

    private double multiply(double a, double b) {
        return a * b;
    }

    private double divide(double a, double b) {
        if (b == 0) {
            throw new ArithmeticException("Division by zero");
        }
        return a / b;
    }
}

