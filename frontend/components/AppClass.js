import React from 'react'
import axios from 'axios'

const URL = "http://localhost:9000/api/result"
const initialState = {
  x:2,
  y:2,
  steps:0,
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

  handleClear = () => {
    this.setState(initialState)
  }

  handleLeftToggle = () => {
    if(this.state.y===1) {
      this.setState({...this.state,
        goneTooFar: true, 
        popUp:"You can't go left", 
        message: ""
      })
    } 
    else { this.setState((state) => ({
      ...this.state,
      y: state.y-1,
      steps: state.steps + 1,
      goneTooFar: false,
      popUp: '',
      message: '',
      submit: false,
    }))
  }   
  }

  handleRightToggle = () => {
    if(this.state.y===3) {
      this.setState({...this.state,
        goneTooFar: true, 
        popUp:"You can't go right", 
        message: ""
      })
    } 
    else { this.setState((state) => ({
      ...this.state,
      y: state.y + 1,
      steps: state.steps + 1,
      goneTooFar: false,
      popUp: '',
      message: '',
      submit: false,
    }))
  }   
  }

  handleUpToggle = () => {
    if (this.state.x ===1) {
      this.setState({...this.state,
        goneTooFar: true, 
        popUp:"You can't go up", 
        message: ""})
    }
    else { this.setState((state) => ({
      ...this.state,
      x: state.x-1,
      steps: state.steps + 1,
      goneTooFar: false,
      popUp: '',
      message: '',
      submit: false,
    }))
  }   
  }

  handleDownToggle = () => {
    if (this.state.x === 3) {
      this.setState({...this.state, 
              goneTooFar: true, 
              popUp:"You can't go down", 
              message: ""})
    }
              else { this.setState((state) => ({
                ...this.state,
                x: state.x+1,
                steps: state.steps + 1,
                goneTooFar: false,
                popUp: '',
                message: '',
                submit: false,
              }))
            }   
  }


  emailHandler = (evt) => {
    this.setState({...this.state, email: evt.target.value})
  }


  onSubmit = (evt) => {
    evt.preventDefault()
    const dataToSubmit = {
      x:this.state.x,
      y:this.state.y,
      steps:this.state.steps,
      email:this.state.email,
    }

    axios.post(URL, dataToSubmit)
      .then(res => {
        this.setState({...this.state, message: res.data.message, submit: true, popUp: ''})
        this.handleClear()
      })
      .catch(err => {
        this.setState({...this.state, message: err.response.data.message, submit: true, popUp: ''})
      })
      this.setState({...this.state, input: evt.target.reset()})
  }



  render() {
    const {x, y, steps} = this.state

    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({y},{x})</h3>
          {steps===1?<h3 id="steps">You moved {steps} time</h3> : <h3 id="steps">You moved {steps} times</h3>}
        </div>
        <div id="grid">
          {x===1 && y===1 ? <div className="square active">B</div> : <div className="square"></div>}
          {x===1 && y===2 ? <div className="square active">B</div> : <div className="square"></div>}
          {x===1 && y===3 ? <div className="square active">B</div> : <div className="square"></div>}
          {x===2 && y===1 ? <div className="square active">B</div> : <div className="square"></div>}
          {x===2 && y===2 ? <div className="square active">B</div> : <div className="square"></div>}
          {x===2 && y===3 ? <div className="square active">B</div> : <div className="square"></div>}
          {x===3 && y===1 ? <div className="square active">B</div> : <div className="square"></div>}
          {x===3 && y===2 ? <div className="square active">B</div> : <div className="square"></div>}
          {x===3 && y===3 ? <div className="square active">B</div> : <div className="square"></div>}
        </div>
        <div className="info">
          {this.state.goneTooFar ? <h3 id="message">{this.state.popUp}</h3> : <h3 id="message"></h3>}
          {this.state.submit ? <h3 id="message">{this.state.message}</h3> : <h3 id="message"></h3>}
        </div>
        <div id="keypad">
          <button onClick={this.handleLeftToggle} id="left">LEFT</button>
          <button onClick={this.handleUpToggle} id="up">UP</button>
          <button onClick={this.handleRightToggle} id="right">RIGHT</button>
          <button onClick={this.handleDownToggle} id="down">DOWN</button>
          <button onClick={this.handleClear} id="reset">reset</button>
        </div>
        <form onSubmit = {this.onSubmit}>
          <input onChange={this.emailHandler} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
