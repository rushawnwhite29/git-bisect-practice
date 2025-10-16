import React, { useState } from 'react'
import './App.css'

function App() {
  const [display, setDisplay] = useState('0')
  const [operand1, setOperand1] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  return (
    <div className="app">
      <div className="calculator">
        <div className="display">{display}</div>
        <div className="keypad">
          {/* Buttons will be added in the next commit */}
        </div>
      </div>
    </div>
  )
}

export default App

