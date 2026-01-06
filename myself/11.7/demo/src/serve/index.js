import axios from "axios";
import {isChinese} from '@/util/util.js'



export const getCurrent = cityName => {
    return axios.get(`https://geocoding-api.open-meteo.com/v1/search`, {
        params: {
            name: cityName ? cityName : '北京',
            language: isChinese(cityName||'北京') ? "zh" : "en"
        }
    })
}

export const getForecast = (lat, long) => {
    return axios.get(`https://api.open-meteo.com/v1/forecast`, {
        params: {
            latitude: lat,
            longitude: long,
            current_weather: true,
            hourly: "apparent_temperature,relativehumidity_2m,surface_pressure,cloudcover,precipitation,windspeed_10m",
            daily: "temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,precipitation_sum",
            forcast_days: 7,
            timezone: "auto"
        }
    })
}