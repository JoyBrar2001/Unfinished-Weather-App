// const apiKey = '736e027253c90a5f0b55a971f6a6cce9'
// const baseUrl = 'https://api.openweathermap.org/data/2.5'
// import { DateTime } from "luxon"

// const getWeatherData = (infoType, searchParam) => {
//     const url = new URL(baseUrl + '/' + infoType)
//     url.search = new URLSearchParams({ ...searchParam, appid: apiKey })

//     return fetch(url).then(response => response.json())
// }

// const formatCurrentWeather = (data) => {
//     const {
//         coord: { lat, lon },
//         main: { temp, feels_like, temp_min, temp_max, humidity },
//         name,
//         dt,
//         sys: { country, sunrise, sunset },
//         weather,
//         wind: { speed },
//     } = data

//     const { main: details, icon } = weather[0]

//     return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, weather, speed }
// }

// const formatForecastWeater = (data) => {
//     let {timezone, daily, hourly} = data
//     daily = daily.slice(1,6).map(d => {
//         return{
//             title: formatToLocalTime(d.dt, timezone, 'ccc'),
//             temp: d.temp.day,
//             icon: d.weather[0].icon,
//         }
//     })

//     hourly = hourly.slice(1,6).map(d => {
//         return{
//             title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
//             temp: d.temp.day,
//             icon: d.weather[0].icon,
//         }
//     })

//     return { timezone, daily, hourly }
// }

// const getFormattedWeatherData = async (searchParam) => {
//     const formattedCurrentWeather = await getWeatherData('weather', searchParam)
//         .then(formatCurrentWeather)

//     const {lat, lon} = formatCurrentWeather

//     const formattedForecastWeather = await getWeatherData('onecall', {
//         lat, 
//         lon, 
//         exclude: 'current, minutely, alerts', 
//         units: searchParam.units
//     }).then(formatForecastWeater)

//     return {...formattedCurrentWeather, ...formattedForecastWeather}
// }

// const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format)

// export default getFormattedWeatherData


import { DateTime } from "luxon";

const API_KEY = "736e027253c90a5f0b55a971f6a6cce9";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

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
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily=[], hourly=[] } = data;
  daily = daily.slice(1,6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = (hourly.slice(1,6)).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall?", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };