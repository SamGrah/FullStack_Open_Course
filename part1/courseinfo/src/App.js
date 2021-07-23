import React from 'react'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exe}
    </p>
  ) 
}

const Content = (props) => {
  return (
    <>
      <Part part={props.part1} exe={props.exe1}/>
      <Part part={props.part2} exe={props.exe2}/>
      <Part part={props.part3} exe={props.exe3}/>
    </>
  )
}

const Total = (props) => {
  const total = props.exe1 + props.exe2 + props.exe3
  return (
    <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundementals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} exe1={exercises1}
               part2={part2} exe2={exercises2}
               part3={part3} exe3={exercises3}/>
      <Total exe1={exercises1} exe2={exercises2} exe3={exercises3}/>
    </div>
  )
}

export default App
