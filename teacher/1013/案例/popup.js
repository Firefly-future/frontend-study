
// 构造函数
function Popup() {

}
Popup.prototype.$ = function (el, parent = document) {
  return parent.querySelector(el)
}
Popup.prototype.$all = function (el, parent = document) {
  return [...parent.querySelectorAll(el)]
}
Popup.prototype.createAlertEl = function (title, content) {
  const alertDialog = document.createElement('div')
  alertDialog.className = 'alert-dialog'
  alertDialog.innerHTML = `
    <div class="alert-content">
      <div class="alert-header">
        <div class="alert-title">${title}</div>
        <div class="alert-close">x</div>
      </div>
      <div class="alert-section">
        <div class="alert-section-content">${content}</div>
        <div class="alert-btns">
          <button class="alert-confirm">确定</button>
        </div>
      </div>
    </div>
  `
  document.body.appendChild(alertDialog)
  this.$('.alert-close', alertDialog).addEventListener('click', () => {
    document.body.removeChild(alertDialog)
  })
  return alertDialog
}
Popup.prototype.alert = function(params) {
  const options = {
    title: '默认标题',
    content: ''
  }
  if (typeof params === 'string') {
    options.content = params
  } else if (Object.prototype.toString.call(params) === '[object Object]') {
    Object.assign(options, params)
  } else {
    throw new Error('参数错误')
  }

  const alertDialog = this.createAlertEl(options.title, options.content)
  this.$('.alert-confirm', alertDialog).addEventListener('click', () => {
    document.body.removeChild(alertDialog)
  })
}
Popup.prototype.confirm = function(params) {
  const options = {
    title: '默认标题',
    content: '',
    btns: [{ text: '确认按钮' }]
  }
  if (typeof params === 'string') {
    options.content = params
  } else if (Object.prototype.toString.call(params) === '[object Object]') {
    Object.assign(options, params)
  } else {
    throw new Error('参数错误')
  }
  // 创建弹窗元素
  const confirmDialog = this.createAlertEl(options.title, options.content)
  if (options.btns.length === 1) {
    options.btns[0].onClick = () => {
      document.body.removeChild(confirmDialog)
    }
  }
  // 渲染按钮
  this.$('.alert-btns', confirmDialog).innerHTML = options.btns.map(item => {
    return `<button>${item.text}</button>`
  }).join('')

  // 获取所有按钮，遍历按钮,给按钮绑定对应的事件
  this.$all('.alert-btns button', confirmDialog).forEach((btn, index) => {
    btn.addEventListener('click', options.btns[index].onClick)
  })
}



Popup.prototype.message = function(msg, params = {}) {
  const options = {
    icon: -1, // -1: 没有图标，0: 失败图标，1: 成功图标
    time: 2000
  }
  Object.assign(options, params)
  const box = document.createElement('div')
  box.className = 'toast-dialog'
  if (options.icon === -1) {
    box.innerHTML = `<div class="toast">${msg}</div>`
  } else {
    const iconMap = {
      0: '❌',
      1: '✅'
    }
    box.innerHTML = `
      <div class="toast-icon">
        <span>${iconMap[options.icon]}</span>
        ${msg}
      </div>
    `
  }
  document.body.appendChild(box)
  setTimeout(() => {
    document.body.removeChild(box)
  }, options.time)
}

Popup.prototype.loading = function() {
  const box = document.createElement('div')
  box.className = 'loading-dialog'
  box.innerHTML = `<div class="loading-icon">加载中......</div>`
  document.body.appendChild(box)

  // return function() {
  //   document.body.removeChild(box)
  // }
  return box
}
Popup.prototype.close = function(dialogEl) {
  document.body.removeChild(dialogEl)
}



// console.log(Object.prototype.toString.call(null))
// console.log(Object.prototype.toString.call([]))
// console.log(Object.prototype.toString.call(''))
// console.log(Object.prototype.toString.call(1234))
// console.log(Object.prototype.toString.call({}))


// const a = { a: 1 }
// const b = { b: 2 }
// const c = { c: 3 }

// // Object.assign: 合并对象，把后续对象合并到第一个参数中
// console.log(Object.assign(a, b, c))
// console.log(a)
// console.log(b)
// console.log(c)




// 初始化实例 
// const popup = new Popup()


  // // popup.alert 调用示例
  // // 用法1 默认标题，默认字符串表示弹窗中提示的内容
  // popup.alert('弹窗内容')

  // // 用法2 自定义标题和内容
  // popup.alert({
  //   // title表示弹窗中的标题
  //   title: '自己设置标题',
  //   // content表示弹窗中提示的内容
  //   content: '弹窗内容'
  // })


  // // popup.confirm 调用示例
  // // 用法1 默认字符串表示询问弹窗中的内容
  // popup.confirm('操作成功')

  // // 用法2 自定义按钮文字和事件
  // popup.confirm(
  //   {
  //     // title表示询问弹窗的标题
  //     title: '标题',
  //     // content表示询问弹窗的内容
  //     content: '操作成功'
  //   }, 
  //   {
  //     // btn表示，两个按钮分别显示的内容
  //     btn: ['ok', 'no']
  //   }, 
  //   function () {
  //     // 第一个函数，表示点击了ok按钮要执行的代码
  //     alert('点击了ok')
  //   }, 
  //   function () {
  //     // 第二个函数，表示点击了no按钮要执行的代码
  //     alert('点击了no')
  //   }
  // )


  // // popup.msg 调用示例
  // // 用法1 默认样式，2s自动关闭
  // popup.msg('提示的内容')

  // // 用法2 设置图标
  // popup.msg('成功状态', {
  //   // icon：0表示失败，1表示成功
  //   icon: 1
  // })

  // // 用法3 自定义关闭时间
  // popup.msg('失败状态，5s后关闭', {
  //     icon: 0,
  //     // time表示自动在多少毫秒之后消失
  //     time: 5000
  // })
  

  // // popup.load 调用示例
  // // 返回关闭的变量
  // const loading = popup.load();
  // setTimeout(function () {
  //   // 关闭loading
  //   popup.close(loading)
  // }, 5000)