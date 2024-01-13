import React from 'react'
import "./CurrentDetails.css"

const CurrentDetails = ({heading, value}) => {
  return (
    <div>
              <h4>{heading}</h4>
              <h3>{value}</h3>
            </div>
  )
}

export default CurrentDetails