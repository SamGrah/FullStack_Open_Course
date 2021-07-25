import React, { useState } from 'react';

function App() {
  const [value, setValue] = useState(10) 

  const setToValue = (newValue) => {
    setValue(newValue)
  }

  const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
          {props.text}
        </button>
    )
  }

  return (
    <div>
      {value}
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}

export default App;
