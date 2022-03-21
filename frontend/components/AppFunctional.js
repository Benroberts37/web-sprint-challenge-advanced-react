import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function AppFunctional(props) {
  const URL = 'http://localhost:9000/api/result'
  const starterGrid = [[0, 0, 0], 
                 [0, 1, 0], 
                 [0, 0, 0]]

  const [steps, setSteps] = useState(0)
  const [grid, setGrid] = useState(starterGrid)
  const [message, setMessage] = useState()
  const [emailField, setEmailField] = useState()


  const findBCoordinates = grid => {
    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid.length; column++) {
        if (grid[row][column]) return [row][column]
      }
    }
  }

  const showCoordinates = grid => {
    const [row,column] = findBCoordinates(grid)
    return `(${column+1}, ${row+1})`
  }

  const moveBSquare = (row, column) => {
    setGrid(grid.map((rowArray, i) => 
      rowArray.map((_, j) => (i === row && j === column) ? true: false)
    ))
    setSteps(steps + 1)
    setMessage()
  }

  const directionToggle = direction => {
    let [row, column] = findBCoordinates(grid)

    if (direction === 'down' && row < 2) {
      moveBSquare(row + 1, column)
    } else if (direction === 'up' && row > 0){
        moveBSquare(row + 1, column)
    } else if (direction === 'right' && column < 2) {
        moveBSquare(row, column + 1)
    } else if (direction === 'left' && column > 0){
        moveBSquare(row, column - 1);
    } else {
      setMessage(`You can't go ${direction}`)
    }
    }

    const reset = () => {
      setTotalSteps(0)
      setGrid(initialGrid)
      setEmailField('')
      setMessage()
    }


    const emailInput = e => {
      const {value} = e.target
      setEmailField(value)
    }

    const onSubmit = e => {
      e.preventDefault()
      const [y,x] = showCoordinates(grid)
      const payload = { "x": x + 1 , 
                        "y": y + 1 , 
                        "steps": steps,
                        "email": emailField, }

      axios.post(URL, payload)
        .then(res => setMessage(res.data.message))
        .catch(err => setMessage(res.data.message))
        setEmailField('')
    }



  return (
    <div id="wrapper" className = {props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {findBCoordinates(grid)}</h3>
        <h3 id="steps">You moved {steps} time{steps ===1 ? null : "s"}</h3>
      </div>
      <div id="grid">
        {
          grid.map((row, i) => {
            return row.map((square, j) => {
              const id = i * grid.length + j
              return square ? <div className = 'square active' key={id}>B</div> : <div className='square' key={id}></div>
            })
          })
        }

      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
      <button id="left" onClick={() => directionToggle('left')}>LEFT</button>
          <button id="up" onClick={() => directionToggle('up')}>UP</button>
          <button id="right" onClick={() => directionToggle('right')}>RIGHT</button>
          <button id="down" onClick={() => directionToggle('down')}>DOWN</button>
          <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={emailInput} value = {emailField}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}





/* 
Todo's:
1. Up, down, right, left buttons must have functionality in order to move the highlighted square
2. reset button needs to have functionality to reset state to original state 
3. Coordinates need to update based on state and where the highlighted square is
4. "You moved {numberOfTimes} should update based on how many times we moved"
5. email form with submit button should be functional at bottom. Posts data to api?
6. submit button does not reset state, but rather produces a message with the pre@ part of the email + win #someNumber
7. If you try to move left, right, up and down outside of the 9 boxes, there will be a message produced saying "you can't go {direction}"
8. Do this for functional and class based components 
*/