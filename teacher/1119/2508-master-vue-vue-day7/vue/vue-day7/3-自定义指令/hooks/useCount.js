import { onBeforeUnmount, ref } from 'vue'

// 组合式函数/自定义 hook： 封装公用逻辑
export const useCount = (s, immediate) => {
  const num = ref(s)
  let intervalId = null

  const start = () => {
    if (num.value <= 0) return
    intervalId = setInterval(() => {
      num.value -= 1
      if (num.value <= 0) {
        num.value = 0
        clearInterval(intervalId)
      }
      // console.log(num.value)
    }, 1000)
  }

  const stop = () => {
    clearInterval(intervalId)
  }

  if (immediate) {
    start()
  }

  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })

  return {
    num,
    start,
    stop
  }
}