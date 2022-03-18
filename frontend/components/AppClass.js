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
    return `(${x+1}, ${y+1})`
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
    let [x, y] = this.findBCoordinates(this.state.grid)

    if (direction === 'down' && x < 2) {
      this.moveBSquare(x + 1, y)
    } else if (direction === 'up' && x > 0){
        this.moveBSquare(x + 1, y)
    } else if (direction === 'right' && y < 2) {
        this.moveBSquare(x + 1, y)
    } else if (direction === 'left' && y > 0){
       
        this.moveBSquare(x + 1, y);
    } else {
      this.setState({...this.state, message: `"You can't go ${direction}"`})
    }
    }

    //Last function we need to create is the axios call to post our data and then put the email field back to blank
    //We need to show the user the message based on the payload that we send  

    onSubmit = e => {
      e.preventDefault()
      const [y,x] = this.findBCoordinates(this.state.grid)
      const payload = { "x": x + 1 , 
                        "y": y + 1 , 
                        "steps": this.state.steps, 
                        "email": this.state.emailField }

      axios.post(this.URL, payload)
        .then(res => this.setState({...this.state, message: res.data.message}))
        .catch(err => this.setState({...this.state, message: err.res.data.message}))
        this.setState({...this.state, emailField: ''})
    }


  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.showCoordinates(this.state.grid)} </h3>
          <h3 id="steps">You moved {this.state.steps} time{this.state.steps === 1 ? null : "s"} </h3>
        </div>
        <div id="grid">
          {
            this.state.grid.map((x, i) => {
              return x.map((square, j) => {
                const id = i * this.state.grid.length + j
                return square ? <div className = "square active" key = {id}>B</div>:<div className = "square" key = {id}></div>
              })
            })
          }

        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.directionToggle('left')}>LEFT</button>
          <button id="up" onClick={() => this.directionToggle('up')}>UP</button>
          <button id="right" onClick={() => this.directionToggle('right')}>RIGHT</button>
          <button id="down" onClick={() => this.directionToggle('down')}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit = {this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange = {this.emailInput} value = {this.state.inputField}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}