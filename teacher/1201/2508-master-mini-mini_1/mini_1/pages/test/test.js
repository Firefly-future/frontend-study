// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    apple: {
      name: '红富士',
      price: 10,
      count: 1
    }
  },

  changeCount(e) {
    // e.detail 接收子组件传过来的数据
    console.log('修改 count', e.detail)
    const { num } = e.detail
    this.setData({
      'apple.count': this.data.apple.count + num
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})