import React, { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const DisplayVotes = (props) => <div>has {props.votes} votes</div>
const DisplayMostVoteQuote = (props) => <div>{props.text}</div>

const Display = (props) => {
  const randomIndex = () => Math.floor(Math.random() * (props.anecdotesData.length - 1))
  const getGreatestVoteIdx = (currentGreatestIdx) => {
    return props.anecdotesData.reduce((acc, quoteData, idx) => {
      if (quoteData.votes > props.anecdotesData[acc].votes) return idx;
      return acc;
    }, currentGreatestIdx)
  }

  const [ selected, setSelected ] = useState(props.anecdotesData[randomIndex()])
  const [ votes, setVotes ] = useState(selected.votes)
  const [ greatestVoteIdx, setGreatestVoteIdx ] = useState(getGreatestVoteIdx(0))

  const addVote = () => {
    props.anecdotesData[selected.index].votes += 1
    setVotes(props.anecdotesData[selected.index].votes)

    const currentIdx = getGreatestVoteIdx(greatestVoteIdx)
    if (greatestVoteIdx !== currentIdx) 
      setGreatestVoteIdx(currentIdx)
  }

  const newSelected = () => {
    const index = randomIndex();
    setSelected(props.anecdotesData[index])
    setVotes(props.anecdotesData[index].votes)
  }
  
  return ( 
    <>
      <h1>Anecdote of the Day</h1>
      <div>{selected.text}</div>
      <DisplayVotes votes={votes} />
      <Button handleClick={addVote} text='vote'/>
      <Button handleClick={newSelected} text="new anecdote" />
      <h1>Anecdote with the most votes</h1>
      <DisplayMostVoteQuote text={props.anecdotesData[greatestVoteIdx].text} />
    </>
  ) 
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const anecdotesData = anecdotes.map((quote, idx) => {
    return {
      text: quote,
      votes: 0, 
      index: idx
    }
  })

  return (
    <div>
      <Display anecdotesData={anecdotesData} /> 
    </div>
  )
}

export default App
