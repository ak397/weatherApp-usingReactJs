import axios from "axios";
import{ React,useState} from "react";
import "./dummy.css";

function Dummy() {

    
  const [response, setResponse] = useState()
  let oldArr = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  ];
  let hourlyUpadte = oldArr.slice(1, 6);

  // let forecast = oldArr.slice(7).filter(function (value, index, Arr) {
  //   return index % 8 === 0;
  // });




  let fetchWeather=async()=>{
    axios.get("https://api.openweathermap.org/data/2.5/forecast?q=london&appid=fcc888159eb7a65a948a0afb086dc9de&units=metric&cnt=40").then((res)=>{
        console.log(res.data.list);
        setResponse(res.data.list)
    })
  }

  
  const dailyData=response.slice(7).filter(function (value, index, Arr) {
    return index % 8 === 0;
  });

  return (
    <div>
      {/* {oldArr.map((element,index)=>{
        return <p key={index}>{element}</p>
    })} */}

      <h1 onClick={fetchWeather}>forecast</h1>
      {dailyData.map((element, index) => {
        return (
          <>
            <p key={index}>{element.main.temp}</p>
          </>
        );
      })}


      {/* {forecast.map((element, index) => {
        return (
          <>
            <p key={index}>{element}</p>
          </>
        );
      })} */}

      <h1>HOurly</h1>
      {hourlyUpadte.map((element, index) => {
        return <p key={index}>{element}</p>;
      })}
    </div>
  );
}

export default Dummy;
