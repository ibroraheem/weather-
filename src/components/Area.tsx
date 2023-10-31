import React from 'react'
import { countryCodeToCountryName } from '../utils/Functions'

const Area = ({ city, country }) => {
  return (
    <div className="area">
      <h1 className="city">{city}</h1>
      <br />
      <h3 className="country">{countryCodeToCountryName(country)}</h3>
    </div>
  )
}

export default Area
