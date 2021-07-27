import React from 'react'

const ListNumbers = ({ phonebook }) => {

  return (
    <>
      <h2>Numbers</h2>
      <div>
        {phonebook.map(entry => {
          return <div key={entry.name}>{entry.name} {entry.number}</div>
          })
        }
      </div>
    </>
  )
}

export default ListNumbers