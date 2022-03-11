import { useState } from 'react'
import axios from 'axios'

const URL = "http://localhost:9000/api/result"

const initialValues = {
    x:2,
    y:2,
    steps:0,
    email: '',
    goneTooFar: false,
    message: ''
  }

  const useToggleHook = () => {
      const [state, setState] = useState(initialValues)
  

const handleClear = () => {
    setState(initialValues)
  }

  const handleLeftToggle = () => {
    if(state.y===1) {
      setState({...state,
        goneTooFar: true, 
        popUp:"You can't go left", 
        message: ""
      })
    } 
    else { setState((state) => ({
      ...state,
      y: state.y-1,
      steps: state.steps + 1,
      goneTooFar: false,
      popUp: '',
      message: '',
      submit: false,
    }))
  }   
  }

  const handleRightToggle = () => {
    if(state.y===3) {
      setState({...this.state,
        goneTooFar: true, 
        popUp:"You can't go right", 
        message: ""
      })
    } 
    else { setState((state) => ({
      ...state,
      y: state.y + 1,
      steps: state.steps + 1,
      goneTooFar: false,
      popUp: '',
      message: '',
      submit: false,
    }))
  }   
  }

  const handleUpToggle = () => {
    if (state.x ===1) {
      setState({...this.state,
        goneTooFar: true, 
        popUp:"You can't go up", 
        message: ""})
    }
    else { setState((state) => ({
      ...state,
      x: state.x-1,
      steps: state.steps + 1,
      goneTooFar: false,
      popUp: '',
      message: '',
      submit: false,
    }))
  }   
  }

  const handleDownToggle = () => {
    if (state.x === 3) {
      setState({...this.state, 
              goneTooFar: true, 
              popUp:"You can't go down", 
              message: ""})
    }
              else { setState((state) => ({
                ...state,
                x: state.x+1,
                steps: state.steps + 1,
                goneTooFar: false,
                popUp: '',
                message: '',
                submit: false,
              }))
            }   
  }


  const emailHandler = (evt) => {
    setState({...this.state, email: evt.target.value})
  }


  const onSubmit = (evt) => {
    evt.preventDefault()
    const dataToSubmit = {
      x:state.x,
      y:state.y,
      steps:state.steps,
      email:state.email,
    }

    axios.post(URL, dataToSubmit)
      .then(res => {
        setState({...state, message: res.data.message, submit: true, popUp: ''})
        handleClear()
      })
      .catch(err => {
        setState({...state, message: err.response.data.message, submit: true, popUp: ''})
      })
      setState({...state, input: evt.target.reset()})
  }

  return [onSubmit, emailHandler, handleDownToggle, handleUpToggle, handleLeftToggle, handleRightToggle, handleClear, state]

}

export default useToggleHook