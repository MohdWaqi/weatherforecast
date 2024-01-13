import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import search from "../assets/search.svg";
import { DataContext } from "../Context/DataProvider";
const apiKey = "6c385b8e770ddeb8ca50f34e34a5f48a";

const NavBar = () => {
  useEffect(() => {
    getCoordinates("Moradabad,in");
  }, []);
  const [isSearch, setSearch] = useState(false);
  const [searchedCity, setSearchedCity] = useState("");
  const { setData, setErr } = useContext(DataContext);
  const getCoordinates = async (city) => {
    try {
      let res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURI(
          city
        )}&limit=1&appid=${apiKey}`
      );
      let coordinatesData = await res.json();
      if (coordinatesData.length) {
        setErr(false);
        getData(coordinatesData[0]);
      } else {
        throw new Error();
      }
    } catch (error) {
      setData({});
      setErr(true);
    }
  };
  const getData = async (coordinates) => {
    try {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`
      );
      let data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav>
      <h1>Weather Forecast</h1>
      <div
        onMouseEnter={() => {
          setSearch(true);
        }}
        onMouseLeave={() => {
          setSearch(false);
        }}
      >
        {isSearch && (
          <input
            placeholder="Type the city name..."
            value={searchedCity}
            onChange={(e) => {
              setSearchedCity(e.target.value);
            }}
          />
        )}
        <img
          src={search}
          alt="search"
          onClick={() => {
            searchedCity !== "" && getCoordinates(searchedCity);
            setSearchedCity("");
          }}
        />
      </div>
    </nav>
  );
};

export default NavBar;
