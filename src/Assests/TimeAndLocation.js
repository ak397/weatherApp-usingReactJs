import React from "react"

export const TimeAndLocation = ({ weather: { temp, details, feels_like, temp_min, temp_max, icon , name, country}, tempUnit }) => {
  const toDate = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Nocvember", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const currentDate = new Date()

    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}, ${currentDate.getHours()} : ${currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes()} `
    return date
  }
  return (
    <>
      <div className="mt-2 text:xl lg:text-2xl font-medium text-center ">
        {name}, {country}, <span className="text-[10px] lg:text-[14px]">{toDate()}</span>
      </div>

      <div className="flex justify-between items-center text-[14px] mt-[-35px] m-auto max-w-fit">
        <span className="text-[28px] font-normal mr-[3px] mb-[5px] ">
          {temp.toFixed()}°{tempUnit}
        </span>
        |<span className="text-[14px] mt-[5px] ml-[5px]">{details}</span>
        <img className="h-24 w-24 my-7 mx-auto" src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" srcSet="" />
        <div className="flex flex-col ml-[0.4rem] lg:ml-24 ">
          <div className="text-[10px] lg:text-[14px]">
            FeelsLike:-{feels_like.toFixed()}°{tempUnit}
          </div>
          <div className="text-[10px] lg:text-[14px]">
            MinTemp:-{temp_min.toFixed()}°{tempUnit}
          </div>
          <div className="text-[10px] lg:text-[14px]">
            MaxTemp:-{temp_max.toFixed()}°{tempUnit}
          </div>
        </div>
      </div>

    </>
  )
}
