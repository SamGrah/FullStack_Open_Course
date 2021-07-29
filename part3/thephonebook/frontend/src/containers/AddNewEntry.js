import React, {useState} from 'react' 
import contactService from '../services/contactService'

const AddNewEntry = ({phonebook, setPhonebook, setMsgInfo }) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const resetFields = () => {
    setNewName('')
    setNewNumber('')
  }

  
  const addEntry = async (event) => {
    event.preventDefault()
    let newEntry = {
      name: newName,
      number: newNumber
    }

    let existingEntry = phonebook.find(person => person.name === newName)
    if (existingEntry) {
      const existMsg = `${newName} is already added to phonebook`
      if (newEntry.number === existingEntry.number) alert(existMsg)
      else {
        const updateMsg = `${existMsg}, replace the older number with a new one?`
        const confirmUpdate = window.confirm(updateMsg)
        if (confirmUpdate) {
          newEntry = {...newEntry, id: existingEntry.id}
          try {
            const updatedEntry = await contactService.modify(newEntry)
            setPhonebook(phonebook.map(entry => {
              return updatedEntry.id === entry.id ? updatedEntry : entry
            }))
            setMsgInfo({ className: 'success', 
                         message: `Updated ${updatedEntry.name}`})
          } catch {
            setPhonebook(phonebook.filter(entry => newEntry.id !== entry.id))
            setMsgInfo({ className: 'error',
                         message: `Information of ${newEntry.name} ` +
                                  "has been removed from the server"})         
          }
        }
      }  
      resetFields('')
      return
    }

    

    const createdEntry = await contactService.update(newEntry)
    setPhonebook(phonebook.concat(createdEntry))
    setMsgInfo({ className: 'success', message: `Added ${createdEntry.name}`})
    resetFields('')
  }
  return (
    <>
      <h1>add a new</h1>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName}
                       onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newNumber} 
                         onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit" >
            add
          </button>
        </div>
      </form>
    </>
  )
}

export default AddNewEntry