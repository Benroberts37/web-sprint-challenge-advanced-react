import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function AppFunctional(props) {
  URL = 'http://localhost:9000/api/result'
  starterGrid = [[0, 0, 0], 
                 [0, 1, 0], 
                 [0, 0, 0]]

  const [steps, setSteps] = useState(0)
  const [grid, setGrid] = useState(starterGrid)
  const [message, setMessage] = useState()
  const [emailField, setEmailField] = useState()

//copying and pasting over from AppClass
  findBCoordinates = grid => {
    for (let row = 0; row < grid.length; row++) {
      for (let column = 0; column < grid.length; column++) {
        if (grid[row][column]) return [row][column]
      }
    }
  }

  showCoordinates = grid => {
    const [row,column] = this.findBCoordinates(grid)
    return `(${column+1}, ${row+1})`
  }

  moveBSquare = (row, column) => {
    this.setState({...this.state, grid: this.state.grid.map((rowArray, i) =>
      rowArray.map((_, j) => (i === row && j === column) ? true : false)
      ), 
      steps: this.state.steps + 1,
      message: null
    })
  }

  directionToggle = direction => {
    let [row, column] = this.findBCoordinates(this.state.grid)

    if (direction === 'down' && row < 2) {
      this.moveBSquare(row + 1, column)
    } else if (direction === 'up' && row > 0){
        this.moveBSquare(row + 1, column)
    } else if (direction === 'right' && column < 2) {
        this.moveBSquare(row, column + 1)
    } else if (direction === 'left' && column > 0){
        this.moveBSquare(row, column - 1);
    } else {
      this.setState({...this.state, message: `"You can't go ${direction}"`})
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

    onSubmit = e => {
      e.preventDefault()
      const [y,x] = showCoordinates(grid)
      const payload = { "x": x + 1 , 
                        "y": y + 1 , 
                        "steps": steps,
                        "email": emailField, }

      axios.post(this.URL, payload)
        .then(res => setMessage(res.data.message))
        .catch(err => setMessage(res.data.message))
        setEmailField('')
    }



  return (
    <div id="wrapper">
      <div className="info">
        <h3 id="coordinates">Coordinates</h3>
        <h3 id="steps">You moved</h3>
      </div>
      <div id="grid">

      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
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