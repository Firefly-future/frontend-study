export default {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    console.log('使用指令的元素', el)
    console.log('指令的值', binding.value)
    el._copyValue = binding.value
    el.clickFn = () => {
      console.log('指令的值', el._copyValue)
      const textarea = document.createElement('textarea')
      textarea.value = el._copyValue
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
      alert('复制成功')
    }
    el.addEventListener('click', el.clickFn)
  },
  updated(el, binding, vnode, prevVnode) {
    el._copyValue = binding.value
    // console.log('最新的数据', el, binding.value)
  },
  beforeUnmount(el, binding, vnode) {
    el.removeEventListener('click', el.clickFn)
  },
}