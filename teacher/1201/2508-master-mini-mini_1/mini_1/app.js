// app.js
App({
  // 小程序全局配置，可以写全局的生命周期，和全局数据
  onLaunch() {
    console.log('第一次加载小程序')
  },
  onShow() {
    console.log('小程序展示')
  },
  onHide () {
    console.log('小程序隐藏');
  },
  globalData: '我是全局数据'
})
