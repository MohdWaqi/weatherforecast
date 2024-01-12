import React, { useState } from 'react'
import "./Navbar.css"
import search from "../assets/search.svg"

const NavBar = () => {
    const [isSearch, setSearch] = useState(false)
  return (
    <nav>
        <h1>Weather Forecast</h1>
        <div onMouseEnter={()=>{setSearch(true)}} onMouseLeave={()=>{setSearch(false)}}>
            {isSearch&&<input/>}
            <img src={search} alt='search'/>
        </div>
    </nav>
  )
}

export default NavBar