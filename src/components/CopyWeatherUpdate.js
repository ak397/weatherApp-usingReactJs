import axios from "axios" //importing axios for api calls
import React, { useState, useEffect } from "react"
import Spinner from "./Spinner"
import { DateTime } from "luxon"
import ToggleButton from "./ToggleButton"

const CopyWeatherUpdate = () => {
  const [search, setSearch] = useState("") //contains value of search query
  const [searchInput, setSearchInput] = useState("") //stores seach query store
  const [units, setUnits] = useState("metric") //for storing units like imperial,metric
  const [tempUnit, setTempUnit] = useState("C") //for celcius and farenhite
  const [response, setResponse] = useState({
    error: false,
    loading: false, //spinner laoding false at starting
    weather: {}, //inititalize blank weather
    forecast: {},
  })

  const fetchWeather = async () => {
    setSearch("") //set search "" otherwise it shows value of search during fetching
    setResponse({ ...response, loading: true }) //find use of this
    const weatherHttpRequest = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=fcc888159eb7a65a948a0afb086dc9de&units=${units}`)
    const ForecastHttpRequest = axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=fcc888159eb7a65a948a0afb086dc9de&units=${units}&cnt=40`)
    axios
      .all([weatherHttpRequest, ForecastHttpRequest])
      .then(
        axios.spread((...responses) => {
          setResponse({
            ...response,
            weather: responses[0].data,
            forecast: responses[1].data,
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
      //listen on enter
      fetchWeather()
    }
  }

  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
  }

  const toDate = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Nocvember", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const currentDate = new Date()

    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}, ${currentDate.getHours()} : ${currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes()} `
    return date
  }
  const dummyToDay = (nextDay = 1) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dummyDate = new Date()
    const dummyDay = `${days[dummyDate.getDay() + parseInt(nextDay)]}`
    return dummyDay
  }

  const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

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
        <div className="dark:bg-black dark:text-white main w-[90vw] h-[75vh] xsm:w-[90vw] p-2 flex items-center flex-col  m-auto my-2 rounded-md lg:h-[90vh] lg:w-[60vw] bg-gradient-to-br from-cyan-300 to bg-cyan-500">
          <h1 className="text-2xl lg:text-4xl font-bold mt-1.5">
            Weather App<i className="fa-solid fa-cloud-sun"></i>
          </h1>
          <div className="space-x-1 lg:space-x-2">
            <input
              className="dark:text-black p-1 lg:p-2 mt-2 text-center rounded-2xl w-24 text-xs lg:w-48 lg:text-sm focus:outline-none"
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
            <i className="fa-solid fa-magnifying-glass ease-out transition hover:scale-125 cursor-pointer" onClick={fetchWeather}></i>
            <ToggleButton />
            <div className="text-[10px] lg:text-[14px] font-semibold inline-block ease-out transition hover:scale-125 cursor-pointer" onClick={handleCelciusClick}>
              °C
            </div>
            <span>|</span>
            <span className="text-[10px] lg:text-[14px]   font-semibold inline-block ease-out transition hover:scale-125 cursor-pointer" onClick={handleFarehniteClick}>
              °F
            </span>
          </div>

          {response.loading && <Spinner />}

          {response.error && <p>No Data Found</p>}

          {response.weather.main && !response.error && (
            <>
              {response.loading}

              <div className="mt-2 text:xl lg:text-2xl font-medium">
                {response.weather.name}, {response.weather.sys.country}, <span className="text-[10px] lg:text-[14px]">{toDate()}</span>
              </div>
              <div className="flex justify-between items-center text-[14px] mt-[-35px]">
                <span className="text-[28px] font-normal mr-[3px] mb-[5px] ">
                  {response.weather.main.temp.toFixed()}°{tempUnit}
                </span>
                |<span className="text-[14px] mt-[5px] ml-[5px]">{response.weather.weather[0].description}</span>
                <img className="h-24 w-24 my-7 mx-auto" src={`https://openweathermap.org/img/wn/${response.weather.weather[0].icon}@2x.png`} alt="" srcSet="" />
                <div className="flex flex-col ml-[0.4rem] lg:ml-24 ">
                  <div className="text-[10px] lg:text-[14px]">
                    FeelsLike:-{response.weather.main.feels_like.toFixed()}°{tempUnit}
                  </div>
                  <div className="text-[10px] lg:text-[14px]">
                    MinTemp:-{response.weather.main.temp_min.toFixed()}°{tempUnit}
                  </div>
                  <div className="text-[10px] lg:text-[14px]">
                    MaxTemp:-{response.weather.main.temp_max.toFixed()}°{tempUnit}
                  </div>
                </div>
              </div>

              <div className="font-bold text-lg mt-[-32px] ">Weather Info</div>
              <div className="outerDiv flex flex-row space-x-2 mt-2">
                <div className="flex flex-row items-center space-x-1 justify-center ">
                  <img className="mx-auto h-4 w-4 lg:h-9 lg:w-9" src="/icons/sunrise.svg" alt="" srcSet="" />
                  <span className="flex flex-col text-[10px] lg:text-[14px]">
                    {getTime(response.weather.sys.sunrise)}
                    <span>Sunrise</span>
                  </span>
                </div>

                <div className="flex flex-row items-center  space-x-1 justify-center ">
                  <img className="mx-auto h-4 w-4 lg:h-9 lg:w-9" src="/icons/sunset.svg" alt="" srcSet="" />
                  <span className="flex flex-col text-[10px] lg:text-[14px]">
                    {getTime(response.weather.sys.sunset)}
                    <span>Sunset</span>
                  </span>
                </div>

                <div className="flex flex-row items-center  space-x-1 justify-center ">
                  <img className="mx-auto h-4 w-4 lg:h-9 lg:w-9" src="/icons/humidity.svg" alt="" srcSet="" />
                  <span className="flex flex-col  text-[10px] lg:text-[14px]">
                    {response.weather.main.humidity}% <span>Humidity</span>
                  </span>
                </div>

                <div className="flex flex-row items-center  space-x-1 justify-center">
                  <img className="mx-auto h-4 w-4 lg:h-9 lg:w-9" src="/icons/wind.svg" alt="" srcSet="" />
                  <span className="flex flex-col  text-[10px] lg:text-[14px]">
                    {response.weather.wind.speed}Km/h <span>Speed</span>
                  </span>
                </div>

                <div className="flex flex-row items-center  space-x-1 justify-center ">
                  <img className="mx-auto h-4 w-4 lg:h-9 lg:w-9" src="/icons/pressure.svg" alt="" srcSet="" />
                  <span className="flex flex-col text-[10px] lg:text-[14px]">
                    {response.weather.main.pressure} <span>Pressure</span>
                  </span>
                </div>
              </div>

              <div className="font-bold text-lg">Hourly Forecast</div>

              <div className="outerDiv flex flex-row space-x-2 mt-2">
                {response.forecast.list.slice(0, 5).map((element, index) => {
                  return (
                    <div key={index} className="flex flex-col justify-center items-center">
                      <span className="text-[9px] lg:text-[14px] font-semibold">{formatToLocalTime(element.dt, element.timezone, "hh:mm a")}</span>
                      <div className="flex flex-row items-center justify-center">
                        <img className="h-10 w-10 lg:h-20 lg:w-20  mx-auto" src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} alt="" srcSet="" />
                        <div className="flex flex-col ">
                          <p className="text-[10px] lg:text-[14px]">
                            {element.main.temp.toFixed()}°{tempUnit}
                          </p>
                          <p className="text-[10px] lg:text-[14px]">{element.weather[0].description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="font-bold text-lg ">Weather Forecast</div>

              <div className="outerDiv flex flex-row space-x-2 mt-2">
                {response.forecast.list
                  .filter(function (value, index, Arr) {
                    return index % 8 === 0
                  })
                  .map((element, index) => {
                    return (
                      <div key={index} className="flex flex-col justify-center items-center">
                        <span className="text-[9px] lg:text-[14px] font-semibold">{dummyToDay(index)}</span>
                        <div className="flex flex-row items-center justify-center lg:mt-[-10px]">
                          <img className="h-10 w-10 lg:h-20 lg:w-20  mx-auto" src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`} alt="" srcSet="" />
                          <div className="flex flex-col ">
                            <p className="text-[10px] lg:text-[14px]">
                              {element.main.temp.toFixed()}°{tempUnit}
                            </p>
                            <p className="text-[10px] lg:text-[14px]">{element.weather[0].description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default CopyWeatherUpdate
