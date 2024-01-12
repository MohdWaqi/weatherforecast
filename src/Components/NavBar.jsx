import React, { useState } from 'react'
import "./Navbar.css"
import search from "../assets/search.svg"
const apiKey = "6c385b8e770ddeb8ca50f34e34a5f48a";

const NavBar = () => {
    const [isSearch, setSearch] = useState(false)
    const [searchedCity, setSearchedCity] = useState("")
    const getCoordinates=async(city)=> {
        try {
          let res = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(city)}&limit=1&appid=${apiKey}`
          );
          let coordinatesData = await res.json();
          console.log(coordinatesData)
          if(coordinatesData.length){
            getData(coordinatesData[0])
        }else{
            throw new Error
        }
            
          
        } catch (error) {
          console.log("This is not a valid city");
        }
      }
      const getData = async(coordinates)=>{
        try {
          let res =await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`
          );
          let data = await res.json();
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <nav>
        <h1>Weather Forecast</h1>
        <div onMouseEnter={()=>{setSearch(true)}} onMouseLeave={()=>{setSearch(false)}}>
            {isSearch&&<input placeholder='Type the city name...' value={searchedCity} onChange={(e)=>{setSearchedCity(e.target.value)}}/>}
            <img src={search} alt='search' onClick={()=>{searchedCity!==""&&getCoordinates(searchedCity)}}/>
        </div>
    </nav>
  )
}

export default NavBar