import React from 'react'
import axios from 'axios'

export default class AppClass extends React.Component {
  URL = 'http://localhost:9000/api/result'
  starterGrid = [[0, 0, 0], 
                 [0, 1, 0], 
                 [0, 0, 0]]
  initialState = { steps: 0, grid: this.starterGrid, message: null, emailField: '' }
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  //Creating a reset button to put things back into initial state
  reset = () => {
    this.setState(this.initialState)
  }

  //Creating a function to handle the email input 
  emailInput = () => {
    const {value} = event.target
    this.setState({...this.state, emailField: value})
  }

  //Creating a function to find the "B" or active square on the grid 
  findBCoordinates = grid => {
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid.length; y++) {
        if (grid[x][y]) return [x][y]
      }
    }
  }

  //Now creating a function to show the user the coordinates they are on
  //This is coming from the readMe "important notes section"
  //We are getting coordinates from the state of the grid 
  showCoordinates = grid => {
    const [x,y] = this.findBCoordinates(grid)
    return (`(${x}, ${y})`)
  }

  //Creating a function to allow the B square to move, and to update the steps
  moveBSquare = (x, y) => {
    this.setState({...this.state, grid: this.state.grid.map((xArray, i) =>
      xArray.map((_, j) => (i === x && j === y) ? true : false)
      ), 
      steps: this.state.steps + 1
    })
  }

  //Now we need to create a function that will make the buttons work and put the B square in the right spot
  directionToggle = direction => {
    let [x, y] = this.findBCoordinates(this.st)
    a
  }


  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates </h3>
          <h3 id="steps">You moved </h3>
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
        <form >
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}