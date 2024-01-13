import { useRef, useEffect, useContext, useState } from "react";
import NavBar from "./Components/NavBar";
import ForecastDisplay from "./Components/ForecastDisplay";
import CurrentDetails from "./Components/CurrentDetails";
import { DataContext } from "./Context/DataProvider";
const apiKey = "6c385b8e770ddeb8ca50f34e34a5f48a";
const date = new Date();

function App() {
  const {data, toggleFormat, setToggleFormat, err} = useContext(DataContext)
  const [forecastData, setForecast] = useState({})
  useEffect(()=>{
    forecast(data.coord)
  },[data])

  const toggleBtn = useRef(null);
  const handleClick = (e) => {
    setToggleFormat(toggleBtn.current.checked);
  };
  const forecast = async(coordinates)=> {
    try {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`
      );
      let data = await res.json();
      console.log(data)
      setForecast(data)

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="app">
      <div className="home">
        <NavBar />

        <div className="btn-container">
          <label className="switch btn-color-mode-switch">
            <input
              ref={toggleBtn}
              type="checkbox"
              name="color_mode"
              id="color_mode"
              onClick={handleClick}
            />
            <label
              htmlFor="color_mode"
              data-on="F"
              data-off="C"
              className="btn-color-mode-switch-inner"
            ></label>
          </label>
        </div>
        <h1>{err?"Something Went Wrong":data.name?`${data.name}, ${data.sys?.country}`:"Please Wait..."}</h1>
      </div>
      <div>
        <div id="forecast">
          {forecastData.list&&forecastData.list.filter((ele, index)=> index%8==0).map((ele, index)=>{let date= new Date(ele.dt_txt); return<ForecastDisplay day={date.toDateString()} temp={toggleFormat?Math.floor(ele.main.temp - 273.15)*9/5+32 + " °":Math.floor(ele.main.temp - 273.15)+ " °"} description={ele.weather[0].description} icon={ele.weather[0].icon}/>})}
          
        </div>
        <div>
          <div>
            <div>
              <h3>
                {date.toLocaleDateString("default", { month: "short" }) +
                  " " +
                  date.toLocaleDateString("default", { day: "numeric" })}
              </h3>

              <h3>
                {date.toLocaleTimeString("default", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </h3>
            </div>
            <div>
              {data.weather&&<img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}/>}
              {data.weather&&<h3>{data.weather[0].description}</h3>}
              {data.weather&&<h1>{toggleFormat?Math.floor(data.main.temp - 273.15)*9/5+32 + " °F":Math.floor(data.main.temp - 273.15) + " °C"}</h1>}
            </div>
            {data.weather&&<div className="details">
              <CurrentDetails heading="Minumum" value={toggleFormat?Math.floor(data.main.temp_min - 273.15)*9/5+32 + " °":Math.floor(data.main.temp_min - 273.15)+ " °"} />
              <CurrentDetails heading="Humidity" value={data.main.humidity +"%"} />
              <CurrentDetails heading="Maximum" value={toggleFormat?Math.floor(data.main.temp_max - 273.15)*9/5+32 + " °":Math.floor(data.main.temp_max - 273.15)+ " °"} />
              <CurrentDetails heading="Speed" value={data.wind.speed+" m/s"} />
              <CurrentDetails heading="Direction" value={data.wind.deg+" °"} />
              <CurrentDetails heading="Feels like" value={toggleFormat?Math.floor(data.main.feels_like - 273.15)*9/5+32 + " °":Math.floor(data.main.feels_like - 273.15)+" °"} />
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
