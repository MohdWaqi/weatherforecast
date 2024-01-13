import React from 'react'
import "./ForecastDisplay.css"
const ForecastDisplay = ({day, temp,description, icon}) => {
  return (
    <div>
      
      <h3>{day}</h3>
      <img src={`https://openweathermap.org/img/wn/${icon}.png`}/>
      <h3 className='temperature'>{temp}</h3>
      <h4>{description}</h4>
    </div>
  )
}

export default ForecastDisplay