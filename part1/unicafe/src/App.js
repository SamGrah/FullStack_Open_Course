import React, { useState } from 'react'

  const Statistic = (props) => {
    return (
      <tr>
        <td>{props.title}</td> 
        <td>{props.value}</td>
      </tr>
    )
  }

  const Statistics = (props) => {
    const all = () => props.good + props.neutral + props.bad
    const average = () => ((props.good - props.bad) / all()).toFixed(2)
    const positive = () => ((props.good / all()) * 100).toFixed(2)

    if (!(props.good + props.neutral + props.bad)) {
      return (
        <div>No feedback given</div>
      )
    }
    return (
      <table>
        <tbody>
          <Statistic title="good" value={props.good} />
          <Statistic title="neutral" value={props.neutral} />
          <Statistic title="bad" value={props.bad} />
          <Statistic title='all' value={all()} />
          <Statistic title='average' value={average()} />
          <Statistic title='positive' value={positive() + ' %'} />
        </tbody>
      </table>
    )
  }

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Button = (props) => {
    return (
      <button onClick={props.handleClick}>
        {props.title}
      </button> 
    )
  } 

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} title="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} title="neutral" />
      <Button handleClick={() => setBad(bad + 1)} title="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
