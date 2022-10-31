import React, { useState } from "react"
import ToggleButton from "../components/ToggleButton"

export const TopButtons = ({ setSearchInput, setUnits,setTempUnit }) => {
  const [search, setSearch] = useState("") //contains value of search query || value of search

  const handleSearchClick = () => {
    if (search !== '') setSearchInput(search)
    setSearch("")
  }

  const handleDailyWeatherRequestEnterKey = async (e) => {
    if (e.key === "Enter") {
      if (search !== '') setSearchInput(search)
      setSearch("")
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

  return (
    <>
      <h1 className="text-2xl lg:text-4xl font-bold mt-1.5">
        Weather App<i className="fa-solid fa-cloud-sun"></i>
      </h1>

      <div className="space-x-1 lg:space-x-2">
        <input
          className="dark:text-black p-1 lg:p-2 mt-2 text-center rounded-2xl w-24 text-xs lg:w-48 lg:text-sm focus:outline-none"
          type="text"
          name="search"
          value={search}//city=search
          placeholder="Search City..."
          onChange={(event) => {
            setSearch(event.target.value)//set city =set search
          }}
          onKeyDown={handleDailyWeatherRequestEnterKey}
        />
        <i className="fa-solid fa-magnifying-glass ease-out transition hover:scale-125 cursor-pointer" onClick={handleSearchClick}></i>
        <ToggleButton />
        <div className="text-[10px] lg:text-[14px] font-semibold inline-block ease-out transition hover:scale-125 cursor-pointer" onClick={handleCelciusClick}>
          °C
        </div>
        <span> | </span>
        <span className="text-[10px] lg:text-[14px]   font-semibold inline-block ease-out transition hover:scale-125 cursor-pointer" onClick={handleFarehniteClick}>
          °F
        </span>
      </div>
    </>
  )
}
