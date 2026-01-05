
export const addZero = n => n < 10 ? `0${n}` : n 
export const format = ms => {
  const h = addZero(Math.floor(ms / 1000 / 60 / 60))
  const m = addZero(Math.floor(ms / 1000 / 60 % 60))
  const s = addZero(Math.floor(ms / 1000 % 60))
  return `${h}:${m}:${s}`
}