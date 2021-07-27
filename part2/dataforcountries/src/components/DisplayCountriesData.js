import React from 'react' 
import DisplayCountry from './DisplayCountry'

const DisplayCountryList = ({ list, setSelected }) => {
  const handleShow = (countryName) => () => setSelected(countryName)

  return ( 
    <div>
      {list.map(country => {
        return (
          <>
            <div key={country.alpha2Code}>
              {country.name} <button onClick={handleShow(country.name)}>show</button>
            </div>
          </>
        )
       })} 
    </div>
  )
}

const DisplayCountriesData = ({ list, selected, setSelected }) => {
  if (selected) list = list.filter(country => country.name === selected)

  if (!list.length) return "No matches"
  if (list.length > 10) return "Too many matches, specify another filter"
  if (list.length === 1) return <DisplayCountry list={list} />
  return <DisplayCountryList list={list} setSelected={setSelected} />

}

export default DisplayCountriesData 