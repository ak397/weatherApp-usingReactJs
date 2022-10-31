import React from "react"
import {  iconUrlFromCode } from "../service/WeatherService"

export const HourlyUpdate = ({weather:{hourly},tempUnit}) => {
  return (
    <>
      <div className="font-bold text-lg text-center">Hourly Forecast</div>

      <div className="outerDiv flex flex-row space-x-2 mt-2">
        {hourly.map((element, index) => {
          return (
            <div key={index} className="flex flex-col justify-center items-center">
              <span className="text-[9px] lg:text-[14px] font-semibold">{element.title}</span>
              <div className="flex flex-row items-center justify-center">
                <img className="h-10 w-10 lg:h-20 lg:w-20  mx-auto" src={iconUrlFromCode(element.icon)} alt="" srcSet="" />
                <div className="flex flex-col ">
                  <p className="text-[10px] lg:text-[14px]">
                    {element.temp.toFixed()}°{tempUnit}
                  </p>
                  <p className="text-[10px] lg:text-[14px]">{element.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
