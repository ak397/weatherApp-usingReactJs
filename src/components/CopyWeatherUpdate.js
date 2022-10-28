import axios from "axios"
import React, { useState, useRef, useEffect } from "react"
import Spinner from "./Spinner"
import { DateTime } from "luxon"

const CopyWeatherUpdate = () => {
  const [search, setSearch] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [response, setResponse] = useState({
    error: false,
    loading: false,
    weather: {},
    forecast: {},
    dummy: {},
  })
  const [units, setUnits] = useState("metric")
  const [tempUnit, setTempUnit] = useState("C")
  const bgMain = useRef()

  const fetchWeather = async () => {
    setSearch("")
    // setSearchInput("")
    setResponse({ ...response, loading: true })
    const weatherHttpRequest = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=fcc888159eb7a65a948a0afb086dc9de&units=${units}`)
    const ForecastHttpRequest = axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=fcc888159eb7a65a948a0afb086dc9de&units=${units}&cnt=40`)
    const DummyForecastHttpRequest = axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=fcc888159eb7a65a948a0afb086dc9de&units=${units}&cnt=40`)
    axios
      .all([weatherHttpRequest, ForecastHttpRequest, DummyForecastHttpRequest])
      .then(
        axios.spread((...responses) => {
          setResponse({
            ...response,
            weather: responses[0].data,
            forecast: responses[1].data,
            dummy: responses[2].data,
            error: false,
            loading: false,
          })
        })
      )
      .catch((error) => {
        // console.log("Error :- " +  error);
        setResponse({ ...response, error: true })
      })
  }

  const handleDailyWeatherRequestEnterKey = async (e) => {
    if (e.key === "Enter") {
      fetchWeather()
    }
  }

  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
  }

  // const isDay = response.weather?.icon?.includes("d")

  const toDate = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Nocvember", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const currentDate = new Date()
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}, ${currentDate.getHours()} : ${currentDate.getMinutes()}`
    return date
  }

  const dummyToDay = (nextDay = 1) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dummyDate = new Date()
    const dummyDay = `${days[dummyDate.getDay() + parseInt(nextDay)]}`
    return dummyDay
  }

  const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

  const toggleDarkMode = () => {
    let htmlClasses = document.querySelector("html").classList
    if (localStorage.theme === "dark") {
      htmlClasses.remove("dark")
      localStorage.removeItem("theme")
    } else {
      htmlClasses.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }

  const handleCelciusClick = () => {
    setUnits("metric")
    setTempUnit("C")
  }
  const handleFarehniteClick = () => {
    setUnits("imperial")
    setTempUnit("F")
  }

  useEffect(() => {
    if (searchInput.length > 1) {
      fetchWeather()
    } else {
      console.log("EnjoY weather app")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units])

  return (
    <>
      <div className="">
        <div ref={bgMain} className="dark:bg-black main w-[90vw] h-[75vh] xsm:w-[90vw] p-2 flex items-center flex-col  m-auto my-2 rounded-md lg:h-[90vh] lg:w-[60vw] bg-gradient-to-br from-cyan-300 to bg-cyan-500">
          <h1 className="text-xl lg:text-4xl font-bold mt-1.5 ">
            Weather App<i className="fa-solid fa-cloud-sun"></i>
          </h1>
          <div className="space-x-2">
            <input
              className="p-2 mt-2 text-center rounded-2xl w-48 text-sm focus:outline-none"
              type="text"
              name="search"
              value={search}
              placeholder="Search City..."
              onChange={(event) => {
                setSearch(event.target.value)
                setSearchInput(event.target.value)
              }}
              onKeyDown={handleDailyWeatherRequestEnterKey}
            />
            <i className="fa-solid fa-magnifying-glass fa-xl ease-out transition hover:scale-125 cursor-pointer " onClick={fetchWeather}></i>
            <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer top-1">
              <input type="checkbox" value="" id="default-toggle" className="sr-only peer" onClick={toggleDarkMode} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Night Mode</span>
            </label>
            <div className="inline-block ease-out transition hover:scale-125 cursor-pointer" onClick={handleCelciusClick}>
              °C
            </div>
            <span> | </span>
            <span className="inline-block ease-out transition hover:scale-125 cursor-pointer" onClick={handleFarehniteClick}>
              °F
            </span>
          </div>

          {/* <button
            className="rounded-md bg-blue-300 p-1 mt-3 text-white w-28"
            onClick={fetchWeather}
          >
            Search
          </button> */}

          {response.loading && <Spinner />}

          {response.error && <p>No Data Found</p>}

          {response.weather.main && !response.error && (
            <>
              {response.loading}

              <div className="mt-2 text:xl lg:text-2xl font-medium">
                {response.weather.name}, {response.weather.sys.country}, <span className="text-[14px]">{toDate()}</span>
                {/* <span className="text-[14px]">{formatToLocalTime(response.dummy.list[0].dt,response.dummy.timezone)}</span> */}
              </div>
              <div className="flex justify-between items-center text-[14px] mt-[-55px]">
                <span className="text-[28px] font-normal mr-[3px] mb-[5px] ">
                  {response.weather.main.temp.toFixed()}°{tempUnit}
                </span>
                |<span className="text-[14px] mt-[5px] ml-[5px]">{response.weather.weather[0].description}</span>
                <img className="h-24 w-24 my-7 mx-auto" src={`https://openweathermap.org/img/wn/${response.weather.weather[0].icon}@2x.png`} alt="" srcSet="" />
                <div className="flex flex-col ml-24 text-[12px] font-medium">
                  <div>Feels Like :- {response.weather.main.feels_like.toFixed()}°{tempUnit}</div>
                  <div>Min Temp :- {response.weather.main.temp_min.toFixed()}°{tempUnit}</div>
                  <div>Max Temp :- {response.weather.main.temp_max.toFixed()}°{tempUnit}</div>
                </div>
              </div>

              <div className="font-bold text-lg mt-[-43px]">Weather Info</div>
              <div className="outerDiv flex flex-row space-x-2 mt-[-11px]">
                {/* <div className="weatherinfoContainer flex w-11/12 justify-evenly items-center mt-[-25px] "> safe code*/}
                {/* 
                <div className="flex flex-row justify-evenly items-center text-sm my-1 mx-2">
                  <img className="h-9 w-9" src="/icons/temp.svg" alt="" srcSet="" />
                  <span className="flex flex-col m-4 text-[14px]">
                    {getTime(response.weather.sys[isDay ? "sunset" : "sunrise"])}
                    <span>Sunset</span>
                  </span>
                </div> */}

                <div className="flex flex-row justify-evenly items-center text-sm my-1 mx-2">
                  <img className="h-9 w-9" src="/icons/sunrise.svg" alt="" srcSet="" />
                  <span className="flex flex-col m-4 text-[14px]">
                    {getTime(response.weather.sys.sunrise)}
                    <span>Sunrise</span>
                  </span>
                </div>

                <div className="flex flex-row justify-evenly items-center text-sm my-1 mx-2">
                  <img className="h-9 w-9" src="/icons/sunset.svg" alt="" srcSet="" />
                  <span className="flex flex-col m-4 text-[14px]">
                    {getTime(response.weather.sys.sunset)}
                    <span>Sunset</span>
                  </span>
                </div>

                <div className="flex flex-row justify-evenly items-center text-sm my-1 mx-2">
                  <img className="h-9 w-9" src="/icons/humidity.svg" alt="" srcSet="" />
                  <span className="flex flex-col m-4 text-[14px]">
                    {response.weather.main.humidity}% <span>Humidity</span>
                  </span>
                </div>

                <div className="flex flex-row justify-evenly items-center text-sm my-1 mx-2">
                  <img className="h-9 w-9" src="/icons/wind.svg" alt="" srcSet="" />
                  <span className="flex flex-col m-4 text-[14px]">
                    {response.weather.wind.speed}Km/h <span>Speed</span>
                  </span>
                </div>

                <div className="flex flex-row justify-evenly items-center text-sm my-1 mx-2">
                  <img className="h-9 w-9" src="/icons/pressure.svg" alt="" srcSet="" />
                  <span className="flex flex-col m-4 text-[14px]">
                    {response.weather.main.pressure} <span>Pressure</span>
                  </span>
                </div>
              </div>

              <div className="font-bold text-lg mt-[-15px]">Hourly Forecast</div>

              <div className="outerDiv flex flex-row space-x-2 mt-6">
                {response.dummy.list.slice(0, 5).map((element, index) => {
                  return (
                    <div key={index} className="flex flex-col justify-center items-center mt-[-20px]">
                      <span className="text-sm font-medium">{formatToLocalTime(element.dt, response.dummy.timezone, "hh:mm a")}</span>
                      <div className="flex flex-row items-center justify-center mt-[-10px]">
                        <img className="h-20 w-20  mx-auto" src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} alt="" srcSet="" />
                        <div className="flex flex-col ">
                          <p className="text-[14px]">
                            {element.main.temp.toFixed()}°{tempUnit}
                          </p>
                          <p className="text-[14px]">{element.weather[0].description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="font-bold text-lg mt-[-15px]">Weather Forecast</div>

              <div className="outerDiv flex flex-row space-x-2 mt-2">
                <div className="flex flex-col justify-center items-center">
                  <span className="text-sm font-medium">{dummyToDay()}</span>
                  <div className="flex flex-row items-center justify-center mt-[-10px]">
                    <img className="h-20 w-20  mx-auto" src={`https://openweathermap.org/img/wn/${response.forecast.list[7].weather[0].icon}@2x.png`} alt="" srcSet="" />
                    <div className="flex flex-col ">
                      <p className="text-[14px]">
                        {response.forecast.list[7].main.temp.toFixed()}°{tempUnit}
                      </p>
                      <p className="text-[14px]">{response.forecast.list[7].weather[0].description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <span className="text-sm font-medium">{dummyToDay(2)}</span>
                  <div className="flex flex-row items-center justify-center mt-[-10px]">
                    <img className="h-20 w-20  mx-auto" src={`https://openweathermap.org/img/wn/${response.forecast.list[15].weather[0].icon}@2x.png`} alt="" srcSet="" />
                    <div className="flex flex-col">
                      <p className="text-[14px]">
                        {response.forecast.list[15].main.temp.toFixed()}°{tempUnit}
                      </p>
                      <p className="text-[14px]">{response.forecast.list[15].weather[0].description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <span className="text-sm font-medium">{dummyToDay(3)}</span>
                  <div className="flex flex-row items-center justify-center mt-[-10px]">
                    <img className="h-20 w-20  mx-auto" src={`https://openweathermap.org/img/wn/${response.forecast.list[23].weather[0].icon}@2x.png`} alt="" srcSet="" />
                    <div className="flex flex-col">
                      <p className="text-[14px]">
                        {response.forecast.list[23].main.temp.toFixed()}°{tempUnit}
                      </p>
                      <p className="text-[14px]">{response.forecast.list[23].weather[0].description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <span className="text-sm font-medium">{dummyToDay(4)}</span>
                  <div className="flex flex-row items-center justify-center mt-[-10px]">
                    <img className="h-20 w-20  mx-auto" src={`https://openweathermap.org/img/wn/${response.forecast.list[31].weather[0].icon}@2x.png`} alt="" srcSet="" />
                    <div className="flex flex-col">
                      <p className="text-[14px]">
                        {response.forecast.list[31].main.temp.toFixed()}°{tempUnit}
                      </p>
                      <p className="text-[14px]">{response.forecast.list[31].weather[0].description}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <span className="text-sm font-medium">{dummyToDay(5)}</span>
                  <div className="flex flex-row items-center justify-center mt-[-10px]">
                    <img className="h-20 w-20  mx-auto" src={`https://openweathermap.org/img/wn/${response.forecast.list[39].weather[0].icon}@2x.png`} alt="" srcSet="" />
                    <div className="flex flex-col">
                      <p className="text-[14px]">
                        {response.forecast.list[39].main.temp.toFixed()}°{tempUnit}
                      </p>
                      <p className="text-[14px]">{response.forecast.list[39].weather[0].description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default CopyWeatherUpdate
