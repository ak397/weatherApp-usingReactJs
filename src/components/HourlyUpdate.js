import axios from "axios";
import { React, useState } from "react";
// import moment from 'moment'
import { DateTime } from "luxon";

function HourlyUpdate() {
  const [data, setData] = useState({});
  const fetchWeater = async () => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/forecast?q=delhi&appid=fcc888159eb7a65a948a0afb086dc9de&units=metric&cnt=40"
      )
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };

  const dummyToDay = (nextDay = 0) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dummyDate = new Date();
    const dummyDay = `${days[dummyDate.getDay() + nextDay]}`;
    // const dummyDay = `${days[dummyDate.getDay() + parseInt(nextday)]}`;
    return dummyDay;
    // console.log(dummyDay);
  };

  //   dummyToDay();
  //   console.log(dummyToDay(1));

  const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
  ) => DateTime.fromSeconds(parseInt(secs)).setZone(parseInt(zone)).toFormat(format);

  // console.log(formatToLocalTime(1664798400,19800,"hh:mm a"));  

  // const hourlyTime = () => {
  //   return DateTime.local();
  // };
  // console.log(hourlyTime());
  return (
    <>
      <h2 className="text-center">Hourly Update</h2>
      <button className="" onClick={fetchWeater}>
        click me
      </button>
      {data ? (
        <>
        <p>hello i am there | simple date object:-{dummyToDay()} </p><br />
        {/* <span>{formatToLocalTime(1664863200,19800,"ccc")}</span>for days */}
        <span>{formatToLocalTime(1664809200,19800,"hh:mm a")}</span>
        </>
      ) : (
        <p>not found</p>
      )}

      {/* {data&&(
        
    <div className="hourly-main-din flex items-center justify-center">
        {data.list.slice(0,5).map((element,index)=>{
            return <>
                <div  className='heading mx-2' key={index}>{element.main.temp}</div><br />
                {console.log(data.list)}
            </>
        })}
    </div>
    )} */}
    </>
  );
}

export default HourlyUpdate;
