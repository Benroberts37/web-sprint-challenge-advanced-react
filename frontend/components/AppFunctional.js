import React from 'react'

export default function AppFunctional(props) {
  return (
    <div id="wrapper" className={props.className}>
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