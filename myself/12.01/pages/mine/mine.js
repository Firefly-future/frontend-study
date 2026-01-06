// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[],
    list:[]
  },
  goDetail(e){
    console.log(e.target.dataset)
    const {id}=e.target.dataset
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
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
    wx.request({
      url: 'http://39.96.210.90:5001/banner',
      success:res=>{
        console.log(res.data.banners)
        this.setData({
          banners:res.data.banners
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail:e=>{
        console.log(e)
        wx.showToast({
          title: '获取失败',
          icon: 'error',
          duration: 2000
        })
      }
    })
    wx.request({
      url:'http://39.96.210.90:5001/toplist',
      success:res=>{
        console.log(res.data.list)
        this.setData({
          list:res.data.list
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail:e=>{
        console.log(e)
        wx.showToast({
          title: '失败',
          icon: 'error',
          duration: 2000
        })
      }
      
    })
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