import React from 'react'
import axios from 'axios'

export default class AppClass extends React.Component {
  URL = 'http://localhost:9000/api/result'
  starterGrid = [[0, 0, 0], 
                 [0, 1, 0], 
                 [0, 0, 0]]
  initialState = { totalSteps: 0, grid: this.starterGrid, message: null, emailInput: '' }
  constructor(props) {
    super(props)
    this.state = this.initialState
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