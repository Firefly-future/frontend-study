export const addZero = (n: number) => {
  return n < 10 ? "0" + n : n + ""
}

export const formatTime = (time: number) => {
  const h = addZero(Math.floor(time / 60 / 60))
  const m = addZero(Math.floor((time / 60) % 60))
  const s = addZero(Math.floor(time % 60))
  return `${h}:${m}:${s}`
}
