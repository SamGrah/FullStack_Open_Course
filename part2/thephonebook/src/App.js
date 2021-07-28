import "./App.css"
import React, { useEffect, useState } from 'react'
import AddNewEntry from './containers/AddNewEntry'
import ListNumbers from './containers/ListNumbers'
import EntryTextFilter from './containers/EntryTextFilter'
import DisplayBannerMsg from './containers/DisplayBannerMsg'
import contactService from './services/contactService'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ msgInfo, setMsgInfo ] = useState()

  const fetchInitalPersonsList = () => {
    ( async() => {
        const initalPersons = await contactService.getAll()
        setPersons(initalPersons)
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
      <DisplayBannerMsg msgInfo={msgInfo} setMsgInfo={setMsgInfo} />
      <EntryTextFilter setFilterText={setFilterText}/>
      <AddNewEntry phonebook={persons} 
                   setPhonebook={setPersons} 
                   setMsgInfo={setMsgInfo}/>
      <ListNumbers phonebook={visibleEntries} 
                   setPhonebook={setPersons} 
                   setMsgInfo={setMsgInfo}/>
    </div>
  )
}

export default App