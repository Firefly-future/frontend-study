
  // 初始化实例 
  const popup = new Popup()

  // popup.alert 调用示例
  // 用法1 默认标题，默认字符串表示弹窗中提示的内容
  popup.alert('弹窗内容')

  // 用法2 自定义标题和内容
  popup.alert({
    // title表示弹窗中的标题
    title: '自己设置标题',
    // content表示弹窗中提示的内容
    content: '弹窗内容'
  })


  // popup.confirm 调用示例
  // 用法1 默认字符串表示询问弹窗中的内容
  popup.confirm('操作成功')

  // 用法2 自定义按钮文字和事件
  popup.confirm(
    {
      // title表示询问弹窗的标题
      title: '标题',
      // content表示询问弹窗的内容
      content: '操作成功'
    }, 
    {
      // btn表示，两个按钮分别显示的内容
      btn: ['ok', 'no']
    }, 
    function () {
      // 第一个函数，表示点击了ok按钮要执行的代码
      alert('点击了ok')
    }, 
    function () {
      // 第二个函数，表示点击了no按钮要执行的代码
      alert('点击了no')
    }
  )


  // popup.msg 调用示例
  // 用法1 默认样式，2s自动关闭
  popup.msg('提示的内容')

  // 用法2 设置图标
  popup.msg('成功状态', {
    // icon：0表示失败，1表示成功
    icon: 1
  })

  // 用法3 自定义关闭时间
  popup.msg('失败状态，5s后关闭', {
      icon: 0,
      // time表示自动在多少毫秒之后消失
      time: 5000
  })
  

  // popup.load 调用示例
  // 返回关闭的变量
  const loading = popup.load();
  setTimeout(function () {
    // 关闭loading
    popup.close(loading)
  }, 5000)