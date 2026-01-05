import axios from "axios";
import { isChinese } from "../utils/util.js";

export const getGeo = (city) => {
  return axios.get("https://geocoding-api.open-meteo.com/v1/search", {
    params: {
      name: city,
      language:isChinese(city) ? "zh" : "en"
    },
  });
};


export const getWeather=(lat,long)=>{
    return axios.get('https://api.open-meteo.com/v1/forecast',{
        params:{
            latitude:lat,
            longitude:long,
            current_weather:true,
            hourly:'apparent_temperature,relativehumidity_2m,surface_pressure,cloudcover,precipitation,windspeed_10m',
            daily:'temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,precipitation_sum',
            forecast_days:7,
            timezone:'auto',
        }
    })
}