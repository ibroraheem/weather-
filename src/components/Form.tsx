import React from 'react'

const Form = ({ value, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="weather-form">
      <input type="text" value={value} placeholder='City here' />
      <button type="submit">Search</button>
    </form>
  )
}

export default Form
