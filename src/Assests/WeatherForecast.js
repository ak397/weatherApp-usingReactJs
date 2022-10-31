import React from "react"
const dummyToDay = (nextDay = 1) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const dummyDate = new Date()
  const dummyDay = `${days[dummyDate.getDay() + parseInt(nextDay)]}`
  return dummyDay
}


export const WeatherForecast = ({weather:{daily},tempUnit}) => {
  return (
    <>
   <div className="font-bold text-lg text-center">Daily Forecast</div>

   <div className="outerDiv flex flex-row space-x-2 mt-2">
     {daily.map((element, index) => {
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
  )
}
