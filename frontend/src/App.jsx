import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [operand1, setOperand1] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key
      
      if (key >= '0' && key <= '9') {
        handleNumberClick(parseInt(key))
      } else if (key === '.') {
        handleDecimal()
      } else if (key === '+') {
        handleOperationClick('add')
      } else if (key === '-') {
        handleOperationClick('subtract')
      } else if (key === '*') {
        handleOperationClick('multiply')
      } else if (key === '/') {
        event.preventDefault()
        handleOperationClick('divide')
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault()
        handleCalculate()
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        handleClear()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [display, operand1, operation, waitingForOperand])

  const handleNumberClick = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleOperationClick = (op) => {
    const inputValue = parseFloat(display)
    
    if (operand1 === null) {
      setOperand1(inputValue)
    }
    
    setOperation(op)
    setWaitingForOperand(true)
  }

  const handleClear = () => {
    setDisplay('0')
    setOperand1(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const handleCalculate = async () => {
    if (operand1 === null || operation === null) {
      return
    }

    const operand2 = parseFloat(display)
    
    try {
      const response = await fetch('http://localhost:8080/api/calculator/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operand1: operand1,
          operand2: operand2,
          operation: operation
        })
      })

      if (!response.ok) {
        throw new Error('Calculation failed')
      }

      const result = await response.json()
      
      if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error')
      } else {
        setDisplay(String(result))
      }
      
      setOperand1(null)
      setOperation(null)
      setWaitingForOperand(false)
    } catch (error) {
      console.error('Calculation error:', error)
      setDisplay('Error')
      setOperand1(null)
      setOperation(null)
      setWaitingForOperand(false)
    }
  }

  return (
    <div className="app">
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="keypad">
          <button className="btn btn-clear" onClick={handleClear}>C</button>
          <button className="btn btn-number" onClick={() => handleNumberClick(7)}>7</button>
          <button className="btn btn-number" onClick={() => handleNumberClick(8)}>8</button>
          <button className="btn btn-number" onClick={() => handleNumberClick(9)}>9</button>
          <button className="btn btn-operation" onClick={() => handleOperationClick('add')}>+</button>
          
          <button className="btn btn-number" onClick={() => handleNumberClick(4)}>4</button>
          <button className="btn btn-number" onClick={() => handleNumberClick(5)}>5</button>
          <button className="btn btn-number" onClick={() => handleNumberClick(6)}>6</button>
          <button className="btn btn-operation" onClick={() => handleOperationClick('subtract')}>-</button>
          
          <button className="btn btn-operation" onClick={() => handleOperationClick('multiply')}>×</button>
          <button className="btn btn-operation" onClick={() => handleOperationClick('divide')}>÷</button>
          
          <button className="btn btn-number" onClick={() => handleNumberClick(1)}>1</button>
          <button className="btn btn-number" onClick={() => handleNumberClick(2)}>2</button>
          <button className="btn btn-number" onClick={() => handleNumberClick(3)}>3</button>
          <button className="btn btn-equals" onClick={handleClear}>=</button>
          
          <button className="btn btn-number btn-zero" onClick={() => handleNumberClick(0)}>0</button>
          <button className="btn btn-number" onClick={handleDecimal}>.</button>
        </div>
      </div>
    </div>
  )
}

export default App

