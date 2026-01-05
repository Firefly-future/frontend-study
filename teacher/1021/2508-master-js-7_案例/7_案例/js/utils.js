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