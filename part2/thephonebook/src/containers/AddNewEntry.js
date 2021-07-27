import React, {useState} from 'react' 

const AddNewEntry = ({phonebook, setPhonebook}) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)
  const resetFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const addEntry = (event) => {
    event.preventDefault()
    if (phonebook.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      resetFields('')
      return;
    }

    const newEntry = {
      name: newName,
      number: newNumber,
    }

    setPhonebook(phonebook.concat(newEntry))
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