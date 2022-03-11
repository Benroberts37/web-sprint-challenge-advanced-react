import React from 'react'
import axios from 'axios'

const URL = "http://localhost:9000/api/result"
const initialState = {
  x:2,
  y:2,
  movements:0,
  email:'',
  goneTooFar: false,
  popUp: '',
  message: '',
  submit:false,
}


export default class AppClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }

  handleLeftToggle = () => {
    if(this.state.x===1) {
      this.setState({...this.state,
        goneTooFar: true, 
        popUp:"You can't go left", 
        message: ""
      })
    } 
    else { this.setState((state) => ({
      ...this.state,
      x: state.x-1,
      movements: state.movements + 1,
      goneTooFar: false,
      popUp: '',
      message: '',
      submit: false,
    }))
  }   
  }

  handleRightToggle = () => {
    if(this.state.x===3) {
      this.setState({...this.state,
        goneTooFar: true, 
        popUp:"You can't go right", 
        message: ""
      })
    } 
    else { this.setState((state) => ({
      ...this.state,
      x: state.x + 1,
      movements: state.movements + 1,
      goneTooFar: false,
      popUp: '',
      message: '',
      submit: false,
    }))
  }   
  }

  handleUpToggle = () => {
    if (this.state.y ===1) {
      this.setState({...this.state,
        goneTooFar: true, 
        popUp:"You can't go up", 
        message: ""})
    }
    else { this.setState((state) => ({
      ...this.state,
      y: state.y-1,
      movements: state.movements + 1,
      goneTooFar: false,
      popUp: '',
      message: '',
      submit: false,
    }))
  }   
  }

  handleDownToggle = () => {
    if (this.state.y === 3) {
      this.setState({...this.state, 
              goneTooFar: true, 
              popUp:"You can't go down", 
              message: ""})
    }
              else { this.setState((state) => ({
                ...this.state,
                y: state.y+1,
                movements: state.movements + 1,
                goneTooFar: false,
                popUp: '',
                message: '',
                submit: false,
              }))
            }   
  }

  handleSubmit() {

  }

  handleEmail = (evt) => {
    this.setState({...this.state, email: evt.target.value})
  }

  handleClear = () => {
    this.setState(initialState)
  }



  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button onClick={this.handleLeftToggle} id="left">LEFT</button>
          <button onClick={this.handleUpToggle} id="up">UP</button>
          <button onClick={this.handleRightToggle} id="right">RIGHT</button>
          <button onClick={this.handleDownToggle} id="down">DOWN</button>
          <button onClick={this.handleClear} id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
