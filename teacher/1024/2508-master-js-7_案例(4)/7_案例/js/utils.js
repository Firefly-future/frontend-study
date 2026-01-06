const $ = el => document.querySelector(el)
const $all = el => [...document.querySelectorAll(el)]

const formatPlayCount = n => {
  if (n > 100000000) {
    return (n / 100000000).toFixed(1) + '亿'
  } else if (n > 100000) {
    return (n / 10000).toFixed(1) + '万'
  } else {
    return n
  }
}

const getQuery = () => {
  return location.search.slice(1).split('&').reduce((prev, item) => {
    const [key, val] = item.split('=')
    prev[key] = decodeURIComponent(val)
    return prev
  }, {})
}

const formatLyricTime = timeStr => {
  const [m, s] = timeStr.split(':')
  return m * 60 + Number(s)
}

const formatDuration = second => {
  const m = addZero(Math.floor(second / 60))
  const s = addZero(Math.floor(second % 60))
  return `${m}:${s}`
}

const addZero = n => n < 10 ? '0' + n : '' + n