export const $ = el => document.querySelector(el)
export const $all = el => [...document.querySelectorAll(el)]

export const formatPlayCount = n => {
  if (n > 100000000) {
    return (n / 100000000).toFixed(1) + '亿'
  } else if (n > 100000) {
    return (n / 10000).toFixed(1) + '万'
  } else {
    return n
  }
}

export const getQuery = () => {
  return location.search.slice(1).split('&').reduce((prev, item) => {
    const [key, val] = item.split('=')
    prev[key] = decodeURIComponent(val)
    return prev
  }, {})
}

export const formatLyricTime = timeStr => {
  const [m, s] = timeStr.split(':')
  return m * 60 + Number(s)
}

export const formatDuration = second => {
  const m = addZero(Math.floor(second / 60))
  const s = addZero(Math.floor(second % 60))
  return `${m}:${s}`
}

export const addZero = n => n < 10 ? '0' + n : '' + n