package com.example.calculator.controller;

import com.example.calculator.model.CalculationRequest;
import com.example.calculator.service.CalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculator")
@CrossOrigin(origins = "http://localhost:5173")
public class CalculatorController {

    @Autowired
    private CalculatorService calculatorService;

    @PostMapping("/calculate")
    public double calculate(@RequestBody CalculationRequest request) {
        return calculatorService.calculate(
            request.getOperand1(),
            request.getOperand2(),
            request.getOperation()
        );
    }
}

