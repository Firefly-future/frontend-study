import { onBeforeUnmount, ref } from "vue";

export const useCount = (s, immediate) => {
  const num = ref(s);
  let IntervalId = null;
  const start = () => {
    if (num.value <= 0) return;
    IntervalId = setInterval(() => {
      num.value -= 1;
      if (num.value <= 0) {
        num.value = 0;
        clearInterval(IntervalId);
      }
      console.log(num.value);
    }, 1000);
  };
  if (immediate) {
    start();
  }
  const stop = () => {
    clearInterval(IntervalId);
  };
  
// 使用此卸载之前，去掉多余的定时器
  onBeforeUnmount(() => {
    clearInterval(IntervalId);
  });
  return {
    num,
    start,
    stop,
  };
};
