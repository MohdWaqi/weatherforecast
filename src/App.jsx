import { useRef } from "react"
import NavBar from "./Components/NavBar"
import ForecastDisplay from "./Components/ForecastDisplay"

function App() {
const toggleBtn = useRef(null)
const handleClick =(e)=>{
console.log(toggleBtn.current.checked)
}
  return (
    <div className="app">
    <div className="home">
    <NavBar/>
     
         <div className="btn-container" >
   
      <label className="switch btn-color-mode-switch">
            <input ref={toggleBtn} type="checkbox" name="color_mode" id="color_mode"onClick={handleClick}/>
            <label htmlFor="color_mode" data-on="F" data-off="C" className="btn-color-mode-switch-inner"></label>
        </label>
      </div>
    </div>
    <div id="forecast">
    <ForecastDisplay/>
    <ForecastDisplay/>
    <ForecastDisplay/>
    <ForecastDisplay/>
    <ForecastDisplay/>
    </div>

    </div>
  )
}

export default App
