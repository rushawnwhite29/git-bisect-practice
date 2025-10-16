import React, { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [operand1, setOperand1] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

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
          
          <button className="btn btn-number" onClick={() => handleNumberClick(1)}>1</button>
          <button className="btn btn-number" onClick={() => handleNumberClick(2)}>2</button>
          <button className="btn btn-number" onClick={() => handleNumberClick(3)}>3</button>
          
          <button className="btn btn-number btn-zero" onClick={() => handleNumberClick(0)}>0</button>
        </div>
      </div>
    </div>
  )
}

export default App

