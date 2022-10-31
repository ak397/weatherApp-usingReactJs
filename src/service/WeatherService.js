import { DateTime } from "luxon"
import axios from "axios"
const apiKey = process.env.REACT_APP_WEATHER_API

const fetchWeather = (searchInput, units) => {
  const weatherHttpRequest = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=${units}`)
  const ForecastHttpRequest = axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${apiKey}&units=${units}&cnt=40`)

  return axios
    .all([weatherHttpRequest, ForecastHttpRequest])
    .then(
      axios.spread((...responses) => {
        const response1 = responses[0].data
        const response2 = responses[1].data
        return [response1, response2]
      })
    )
    .catch((error) => {
      // console.log("Error :- " +  error);
      //   setResponse({ ...response, error: true })
    })
}

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data[0]

  const { main: details, icon } = weather[0]

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  }
}

const formatForecastWeather = (data) => {
  let { message, list,timezone} = data[1]
  let hourly = list.slice(0, 5).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.main.temp,
      icon: d.weather[0].icon,
      description: d.weather[0].description,
    }
  })

  let daily = list.filter(function (value, index, Arr) {
    return index % 8 === 0
  })
  // console.log(daily);
  return { daily, hourly, timezone, message }
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

const getTime = (timeStamp) => {
  return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
}

const getFormattedWeatherData = async (city, units) => {
  const formattedCurrentWeather = await fetchWeather(city, units).then(formatCurrentWeather)

  const formattedForecastWeather = await fetchWeather(city, units).then(formatForecastWeather)

  return { ...formattedCurrentWeather, ...formattedForecastWeather }
}

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export { formatToLocalTime, iconUrlFromCode,getTime }

export default getFormattedWeatherData
