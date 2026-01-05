import dayjs from "dayjs"

export const formatTime=str=>{
    return dayjs(str*1000).format('YYYY-MM-DD')
}
const weekday=['周日','周一','周二','周三','周四','周五','周六']

// 获取月日
export const formatDate=date=>{
    const time=dayjs(date)
    const d = time.format('d')
    return weekday[d]+time.format('MM月DD日')
}

// 获取分秒
export const formatMinSec=time=>{
    return dayjs(time).format('HH:mm')
}
