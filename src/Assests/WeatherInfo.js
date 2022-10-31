import React from "react"
import { getTime } from "../service/WeatherService"

export const WeatherInfo = ({ weather: { sunrise, sunset, humidity, speed, pressure } }) => {

  return (
    <>
      <div className="font-bold text-lg mt-[-32px] text-center">Weather Info</div>
      <div className="outerDiv flex flex-row space-x-2 mt-2 items-center justify-center">
        <div className="flex flex-row items-center space-x-1 justify-center ">
          <img className="mx-auto h-4 w-4 lg:h-9 lg:w-9" src="/icons/sunrise.svg" alt="" srcSet="" />
          <span className="flex flex-col text-[10px] lg:text-[14px]">
            {getTime(sunrise)}
            <span>Sunrise</span>
          </span>
        </div>

        <div className="flex flex-row items-center  space-x-1 justify-center ">
          <img className="mx-auto h-4 w-4 lg:h-9 lg:w-9" src="/icons/sunset.svg" alt="" srcSet="" />
          <span className="flex flex-col text-[10px] lg:text-[14px]">
            {getTime(sunset)}
            <span>Sunset</span>
          </span>
        </div>

        <div className="flex flex-row items-center  space-x-1 justify-center ">
          <img className="mx-auto h-4 w-4 lg:h-9 lg:w-9" src="/icons/humidity.svg" alt="" srcSet="" />
          <span className="flex flex-col  text-[10px] lg:text-[14px]">
            {humidity}% <span>Humidity</span>
          </span>
        </div>

        <div className="flex flex-row items-center  space-x-1 justify-center">
          <img className="mx-auto h-4 w-4 lg:h-9 lg:w-9" src="/icons/wind.svg" alt="" srcSet="" />
          <span className="flex flex-col  text-[10px] lg:text-[14px]">
            {speed}Km/h <span>Speed</span>
          </span>
        </div>

        <div className="flex flex-row items-center  space-x-1 justify-center ">
          <img className="mx-auto h-4 w-4 lg:h-9 lg:w-9" src="/icons/pressure.svg" alt="" srcSet="" />
          <span className="flex flex-col text-[10px] lg:text-[14px]">
            {pressure} <span>Pressure</span>
          </span>
        </div>
      </div>
    </>
  )
}
