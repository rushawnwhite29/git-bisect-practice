package com.example.calculator.service;

import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    public double calculate(double operand1, double operand2, String operation) {
        switch (operation.toLowerCase()) {
            case "add":
                return add(operand1, operand2);
            default:
                throw new IllegalArgumentException("Unsupported operation: " + operation);
        }
    }

    private double add(double a, double b) {
        return a + b;
    }
}

