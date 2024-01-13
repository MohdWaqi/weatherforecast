import { useRef, useEffect } from "react";
import NavBar from "./Components/NavBar";
import ForecastDisplay from "./Components/ForecastDisplay";
import CurrentDetails from "./Components/CurrentDetails";
const date = new Date();

function App() {
  const toggleBtn = useRef(null);
  const handleClick = (e) => {
    console.log(toggleBtn.current.checked);
  };
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
        <h1>City, Country</h1>
      </div>
      <div>
        <div id="forecast">
          <ForecastDisplay />
          <ForecastDisplay />
          <ForecastDisplay />
          <ForecastDisplay />
          <ForecastDisplay />
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
              <h3>icon</h3>
              <h3>description</h3>
              <h1>main temp</h1>
            </div>
            <div className="details">
              <CurrentDetails />
              <CurrentDetails />
              <CurrentDetails />
              <CurrentDetails />
              <CurrentDetails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
