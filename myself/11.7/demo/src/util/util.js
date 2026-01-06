
export const $ = (el, parent = document) => parent.querySelector(el)
export const $all = (el, parent = document) => [...parent.querySelectorAll(el)]

// 天气代码
export const weathercode = {
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
export function getSimpleWindDirection(degree) {
    const adjustedDegree = degree === 0 ? 0 : degree - 11.25; // 稍微偏移以匹配中点
    const keys = Object.keys(simpleWindDirections).map(Number);
    const closest = keys.reduce((prev, curr) =>
        Math.abs(curr - adjustedDegree) < Math.abs(prev - adjustedDegree) ? curr : prev
    );
    return simpleWindDirections[closest] || '未知';
}

// 判断是否是中文
export function isChinese(str){
    const reg = /^[\u4e00-\u9fa5]+$/
    return reg.test(str)
}


export const weekday=['周一','周二','周三','周四','周五','周六','周日']