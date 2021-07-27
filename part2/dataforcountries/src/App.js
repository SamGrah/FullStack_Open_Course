import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FilterTextEntry from './components/FilterTextEntry'
import DisplayCountriesData from './components/DisplayCountriesData'

const App = () => {
  const [ allCountries, setAllContries ] = useState([])
  const [ filterText, setFilterText ] = useState('')
  const [ selected, setSelected] = useState('')

  const fetchAllCountries = () => {
    (async () => {
      let allCountries = await axios.get('https://restcountries.eu/rest/v2/all')
      setAllContries(allCountries.data)
    })()
  }
  useEffect(fetchAllCountries, [])

  const visibleCountries = filterText ? 
    allCountries.filter(cty => cty.name.toLowerCase().includes(filterText)) :
    allCountries

return ( 
    <>
      <FilterTextEntry setFilterText={setFilterText} setSelected={setSelected} />
      <DisplayCountriesData list={visibleCountries} 
                          selected={selected} 
                          setSelected={setSelected} />                 

    </>
  ) 
}


export default App;
