import React from 'react'
import contactService from '../services/contactService'

const ListNumbers = ({ phonebook, setPhonebook, setMsgInfo }) => {

  const handleDelete = (contact) => async () => {
    const confirmation = window.confirm(`Delete ${contact.name}?`)
    if (!confirmation) return
    try {
      await contactService.remove(contact.id)
      setMsgInfo({ className: "success", 
                   message: `Deleted ${contact.name}`})
    } catch { 
      setMsgInfo({ className: "inform" ,
                   message: `Information of ${contact.name} ` +
                            "isn't present on the server"})
    }  
    const listOfPersons = await contactService.getAll()
    setPhonebook(listOfPersons)
  }

  return (
    <>
      <h2>Numbers</h2>
      <div>
        { phonebook.map(entry => {
            return (
              <div key={entry.name}>
                {entry.name} {entry.number}
                <button onClick={handleDelete(entry)}>delete</button>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default ListNumbers