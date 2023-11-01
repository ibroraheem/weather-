import React, { useState, useEffect } from 'react'
import { dateToString, getDateTimeFromTimezone } from '../utils/Functions'

const DateTime = ({ timezone }) => {
  const [dateTime, setDateTime] = useState(getDateTimeFromTimezone(timezone))

  useEffect(() => {
    const timerID = setInterval(() => {
      setDateTime(getDateTimeFromTimezone(timezone))
    }, 1000)

    return () => {
      clearInterval(timerID)
    }
  }, [timezone])

  return (
    <div className="date-time text-gray-800">
      <h1 className="time">
        {/* display time in hour and minute */}
        {dateTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric'
        })}
      </h1>
      <br />
      <h3 className="date">{dateToString(dateTime)}</h3>
    </div>
  )
}

export default DateTime
