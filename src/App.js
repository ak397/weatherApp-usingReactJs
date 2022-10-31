import "./App.css"
import { MadeWithLove } from "./components/MadeWithLove"
// import { TopButtons } from "./Assests/TopButtons"
// import getFormattedWeatherData from "./service/WeatherService"
// import React, { useState, useEffect } from "react"
// import { TimeAndLocation } from "./Assests/TimeAndLocation"
// import { WeatherInfo } from "./Assests/WeatherInfo"
// import { HourlyUpdate } from "./Assests/HourlyUpdate"
// import { WeatherForecast } from "./Assests/WeatherForecast"
// import Spinner from "./components/Spinner"

import CopyWeatherUpdate from "./components/CopyWeatherUpdate"
// import WeatherUpdate from "./components/WeatherUpdate";//main code work

const App = () => {
  // const [search, setSearch] = useState("") //contains value of search query
  // // console.log(search);
  // const [searchInput, setSearchInput] = useState("") //stores seach query store
  // const [units, setUnits] = useState("metric") //for storing units like imperial,metric
  // const [tempUnit, setTempUnit] = useState("C") //for celcius and farenhite
  // const [response, setResponse] = useState({
  //   error: false,
  //   loading: false, //spinner laoding false at starting
  // })
  // const [weather, setWeather] = useState(null)

  // useEffect(() => {
  //   const getWeather = async () => {
  //     setResponse({ loading: true })
  //     await getFormattedWeatherData(searchInput, units)
  //       .then((data) => {
  //         setWeather(data)
  //         setResponse({ loading: false })
  //         setResponse({ error: false })
  //       })
  //       .catch((error) => {
  //         setResponse({ loading: false })
  //         setResponse({ error: true })
  //         console.log("Error :-" + error)
  //       })
  //   }

  //   if (searchInput.length > 1) {
  //     getWeather()
  //   } else {
  //     console.log("EnjoY weather app")
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchInput, units])

  return (
    <>
      {/* <WeatherUpdate/> */}
      <CopyWeatherUpdate />
      {/* <div className="">
        <div className="dark:bg-black dark:text-white main w-[90vw] h-[75vh] xsm:w-[90vw] p-2 flex items-center flex-col  m-auto my-2 rounded-md lg:h-[90vh] lg:w-[60vw] bg-gradient-to-br from-cyan-300 to bg-cyan-500">
          <TopButtons setSearch={setSearch} setSearchInput={setSearchInput} units={units} setUnits={setUnits} setTempUnit={setTempUnit} />

          {response.loading && <Spinner />}
          {response.error && <p>No Data Found</p>}

          {weather && (
            <div>
              <TimeAndLocation weather={weather} tempUnit={tempUnit} />
              <WeatherInfo weather={weather} />
              <HourlyUpdate weather={weather} tempUnit={tempUnit} />
              <WeatherForecast weather={weather} tempUnit={tempUnit} />
            </div>
          )}
        </div>
      </div> */}
      <MadeWithLove />
    </>
  )
}
export default App
