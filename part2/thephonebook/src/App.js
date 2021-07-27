import React, { useEffect, useState } from 'react'
import AddNewEntry from './containers/AddNewEntry'
import ListNumbers from './containers/ListNumbers'
import EntryTextFilter from './containers/EntryTextFilter'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])

  const fetchInitalPersonsList = () => {
    (async () => {
      let initalPersons = await axios.get("http://localhost:3001/persons")
      setPersons(initalPersons.data)
    })()
  }
  useEffect(fetchInitalPersonsList, [])

  const [filterText, setFilterText] = useState('')
  const visibleEntries = filterText.length 
    ? persons.filter(entry => entry.name.toLowerCase().includes(filterText))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <EntryTextFilter setFilterText={setFilterText}/>
      <AddNewEntry phonebook={persons} setPhonebook={setPersons} />
      <ListNumbers phonebook={visibleEntries} />
    </div>
  )
}

export default App