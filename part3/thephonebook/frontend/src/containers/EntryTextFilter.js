import React from 'react'

const EntryTextFilter = ({ setFilterText }) => {
  const handleFilterChange = (event) => {
    const filterText = event.target.value.toLowerCase()
    setFilterText(filterText)
  }

  return (
    <div>filter shown with <input onChange={handleFilterChange}/></div>
  )
}

export default EntryTextFilter