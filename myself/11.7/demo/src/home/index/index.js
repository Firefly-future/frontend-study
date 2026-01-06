
import './index.scss'
import { $, $all, weathercode, simpleWindDirections, getSimpleWindDirection } from '@/util/util.js'
import { getCurrent, getForecast } from '../../serve/index.js'
import { weekday } from '../../util/util.js'
import dayjs from 'dayjs'
import * as echarts from 'echarts';


const nav = $('nav')
const inp = $('.inp')
const search = $('.search')

const section = $('.section')
const dayDetail = $('.dayDetail')

let latitude = 0
let longitude = 0

const HISTORY_KEY = 'history'
const maxCount = 7 // 最多保存7条记录
const historyList = $('.history-list')



init()
function init() {
  navigator.geolocation.getCurrentPosition(
    function(pos) {
      console.log('✅ 获取定位成功:', pos.latitude,pos.longitude);
    },
    function(error) {
      console.error('❌ 获取定位失败:', error.message); // 打印具体错误
      console.error('错误码:', error.code); // 1=拒绝, 2=不可用, 3=超时
    }
  );
}







window.addEventListener('load', () => {
    renderSearchHistory()
})
// 保存搜索记录
function saveSearchHistory(cityName) {
    if (!cityName) return
    
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
    
    // 移除重复项（如果已存在则先删除）
    history = history.filter(item => item !== cityName)
    
    // 添加到开头
    history.unshift(cityName)
    
    // 限制数量
    if (history.length > maxCount) {
        history = history.slice(0, maxCount)
    }
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    renderSearchHistory() // 重新渲染
}

// 渲染历史记录列表
function renderSearchHistory() {
    const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
    
    if (history.length === 0) {
        historyList.innerHTML = '<div class="empty-tip">暂无搜索记录</div>'
        return
    }
    
    historyList.innerHTML = history.map(city => `
        <div class="city-item history-item" data-city="${city}">
            ${city}
            <span class="delete-btn" data-delete="${city}">×</span>
        </div>
    `).join('')
    
    // 绑定点击事件
    $all('.history-item').forEach(item => {
        item.addEventListener('click', e => {
            // 如果点击的是删除按钮，不触发城市查询
            if (e.target.classList.contains('delete-btn')) {
                const id=e.target.getAttribute('data-delete')
                // e.stopPropagation()
                deleteHistoryItem(id)
                return
            }
            const id=e.target.getAttribute('data-city')
            const cityName = id
            inp.value = cityName
            getCityData(cityName)
        })
    })
}

// 删除单条历史记录
function deleteHistoryItem(cityName) {
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
    history = history.filter(item => item !== cityName)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
    renderSearchHistory()
}



$all('.city-item').forEach((item, index) => {
    item.addEventListener('click', e => {
        inp.value = item.innerText
        getCityData(inp.value)
        // renderWeatherData()
    })
})
inp.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        getCityData(inp.value.trim())
    }
})

$('.search').addEventListener('click', e => {
    let cityName = inp.value.trim()
    if (!cityName) {
        alert('请输入地址')
        return
    } else {
        getCityData(cityName)
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
        const res = await getCurrent(name)
        console.log(res)
        if (!res.data.results || res.data.results.length === 0) {
            alert('未找到该城市，请检查名称');
            return;
        }
        
        saveSearchHistory(name)

        $('.box1 .city').innerHTML = res.data.results[0].name
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
        const res = await getForecast(lat, long)
        console.log(res.data)
        $('.box1 .temperature span').innerText = res.data.current_weather.temperature
        $('.box1 .weather').innerText = weathercode[res.data.current_weather.weathercode]
        $('.windspeed .value span').innerText = res.data.current_weather.windspeed
        $('.wind .value span').innerText = getSimpleWindDirection(res.data.current_weather.winddirection)
        $('.updatetime .value span').innerText = res.data.current_weather.time.split('T').splice(1)
        $all('.day .date').forEach((item, index) => {
            item.innerText = renderWeekDay(res.data.daily.time[index], index)
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
        $('.bodytemp .value span').innerText = res.data.hourly.apparent_temperature[Math.floor(Math.random() * (24 - 0 + 1)) + 0]
        getEcharts(res.data.daily,res.data.daily_units)
    } catch (e) {
        console.log(e)
    }
}


function renderWeekDay(time, index) {
    if (index === 0) return '今天'
    if (index === 1) return '明天'
    return weekday[dayjs(time).format('d')]
}


// 未来七天折线图
const myChart = echarts.init($('.echarts'));
function getEcharts(daily,daily_units){
// 指定图表的配置项和数据
const option = {
    title: {
        text: '7天天气预报'
    },
     tooltip: {
    trigger: 'axis'
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      dataView: { readOnly: false },
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: daily.time.map(renderWeekDay)
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} °C'
    }
  },
  series: [
    {
      name: '最高温',
      type: 'line',
      data: daily.temperature_2m_max,
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      }
    },
    {
      name: '最低温',
      type: 'line',
      data: daily.temperature_2m_min,
      markPoint: {
        data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
      },
    //   markLine: {
    //     data: [
    //       { type: 'average', name: 'Avg' },
    //       [
    //         {
    //           symbol: 'none',
    //           x: '90%',
    //           yAxis: 'max'
    //         },
    //         {
    //           symbol: 'circle',
    //           label: {
    //             position: 'start',
    //             formatter: 'Max'
    //           },
    //           type: 'max',
    //           name: '最高点'
    //         }
    //       ]
    //     ]
    //   }
    }
  ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
}

