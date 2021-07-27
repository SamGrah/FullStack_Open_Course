import React from 'react'

const FilterTextEntry = ({ setFilterText, setSelected }) => {
  const updateFilterText = (event) => {
    setFilterText(event.target.value.toLowerCase())
    setSelected('')
  }
  
  return (
    <div>
      find countries<input onChange={updateFilterText} />
    </div>
    
  )
}

export default FilterTextEntry