// const axios=require('axios')
const weathercode = {
    0: '晴天☀️',
    1: "多云🌥️",
    2: "多云🌥️",
    3: "多云🌥️",
    45: '有雾🌁',
    48: '有雾🌁',
    51: `毛毛雨`,
    52: `毛毛雨`,
    53: `毛毛雨`,
    54: `毛毛雨`,
    55: `毛毛雨`,
    61: '小/中雨🌧️',
    62: '小/中雨🌧️',
    63: '小/中雨🌧️',
    64: '小/中雨🌧️',
    65: '小/中雨🌧️',
    66: '冻雨❄️🌧️',
    67: '冻雨❄️🌧️',
    71: '小/中雪❄️',
    72: '小/中雪❄️',
    73: '小/中雪❄️',
    74: '小/中雪❄️',
    75: '小/中雪❄️',
    80: '阵雨⛈️',
    81: '阵雨⛈️',
    82: '阵雨⛈️',
    95: '雷雨⛈️',
    96: '强雷暴⚡',
    97: '强雷暴⚡',
    98: '强雷暴⚡',
    99: '强雷暴⚡',
}

// 风向的代码
const simpleWindDirections = {
    0: '北风',
    45: '东北风',
    90: '东风',
    135: '东南风',
    180: '南风',
    225: '西南风',
    270: '西风',
    315: '西北风'
};
function getSimpleWindDirection(degree) {
    const adjustedDegree = degree === 0 ? 0 : degree - 11.25; // 稍微偏移以匹配中点
    const keys = Object.keys(simpleWindDirections).map(Number);
    const closest = keys.reduce((prev, curr) =>
        Math.abs(curr - adjustedDegree) < Math.abs(prev - adjustedDegree) ? curr : prev
    );
    return simpleWindDirections[closest] || '未知';
}


const $ = (el, parent = document) => parent.querySelector(el)
const $all = (el, parent = document) => [...parent.querySelectorAll(el)]
const nav = $('nav')
const inp = $('.inp')
const search = $('.search')

const section = $('.section')
const dayDetail = $('.dayDetail')

let latitude = 0
let longitude = 0

$all('.city-item').forEach((item, index) => {
    item.addEventListener('click', e => {
        inp.value = item.innerText
        getCityData(inp.value)
        // renderWeatherData()
    })
})

$('.search').addEventListener('click', e => {
    let cityName = inp.value.trim()
    if (!cityName) {
        alert('请输入地址')
        return
    } else {
        getCityData(cityName)
        // renderWeatherData()
    }
})

// nav.addEventListener('click', e => {
//     const { target } = e
//     // console.log(target)
//     let cityName = inp.value.trim()
//     if (target.classList.contains('city-item')) {
//         // console.log(target)
//         inp.value = target.innerText
//         getCityData(inp.value)
//         // inp.value=''
//     }
//     else if (target.classList.contains('search')) {

//         if (!cityName) {
//             alert('请输入地址')
//         }
//     } else {
//         getCityData(cityName)
//     }

// })


// 获取数据
// https://geocoding-api.open-meteo.com/v1/search?name=%E6%88%90%E9%83%BD&language=zh
async function getCityData(name) {
    try {
        const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search`, {
            params: {
                name: name ? name : '北京',
                language: "zh"
            }
        })
        console.log(res)
        if (!res.data.results || res.data.results.length === 0) {
            alert('未找到该城市，请检查名称');
            return;
        }
        $('.box1 .city').innerHTML = res.data.results[0].name
        // id=res.data.results[0].id
        latitude = res.data.results[0].latitude
        longitude = res.data.results[0].longitude
        console.log(latitude, longitude)
        await getWeatherData(latitude, longitude)
    } catch (e) {
        console.log(e)
    }
}
getCityData()

async function getWeatherData(lat, long) {
    if (!lat || !long) {
        console.log('经度或者维度有缺失')
        return
    }
    try {
        const res = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
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
        console.log(res.data)
        $('.box1 .temperature span').innerText = res.data.current_weather.temperature
        $('.box1 .weather').innerText = weathercode[res.data.current_weather.weathercode]
        $('.windspeed .value span').innerText = res.data.current_weather.windspeed
        $('.wind .value span').innerText = getSimpleWindDirection(res.data.current_weather.winddirection)
        $('.updatetime .value span').innerText = res.data.current_weather.time.split('T').splice(1)
        $all('.day .date').forEach((item, index) => {
            item.innerText = res.data.daily.time[index]
        })
        $all('.day .weather').forEach((item, index) => {
            item.innerText = weathercode[res.data.daily.weathercode[index]]
        })
        $all('.day .temp .temperature-min span').forEach((item, index) => {
            item.innerText = res.data.daily.temperature_2m_min[index]
        })
         $all('.day .temp .temperature-max span ').forEach((item, index) => {
            item.innerText = res.data.daily.temperature_2m_max[index]
        })
        $('.bodytemp .value span').innerText=res.data.hourly.apparent_temperature[Math.floor(Math.random()*(24-0+1))+0]
    } catch (e) {
        console.log(e)
    }
}
