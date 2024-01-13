import React, { createContext, useState } from 'react'

export const DataContext = createContext()
const DataProvider = ({children}) => {
    const [data, setData] = useState({})
    const [err, setErr] = useState(false)
    const [toggleFormat, setToggleFormat] = useState(false)
  return (
    <DataContext.Provider value={{data, setData, err, setErr, toggleFormat, setToggleFormat}}>
    {children}
    </DataContext.Provider>
  )
}

export default DataProvider