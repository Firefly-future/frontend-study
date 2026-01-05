// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: 'abc',
    title: '我是标题',
    num: 91,
    arr: ['a', 'b', 'c'],
    list: [
      { name: '小明', age: 22 },
      { name: '小王', age: 24 },
      { name: '小红', age: 23 }
    ],
    obj: {
      desc: '我是一个对象',
      info: {
        a: {
          b: {
            c: 100
          }
        }
      }
    }
  },

  changeDesc(e) {
    console.log(e.detail.value)
    this.setData({
      'obj.desc': e.detail.value
    })
  },

  changeNum(e) {
    // 获取参数
    const { num } = e.target.dataset
    console.log(e.target.dataset)
    // 调用setData出发页面更新
    this.setData({
      num: this.data.num + num
    })
    console.log('changeNum', this.data.num)
  },
  add () {
    this.setData({
      'obj.info.a.b.c': this.data.obj.info.a.b.c + 1,
      'list[2].age': this.data.list[2].age + 2
    })
  },
  push() {
    this.setData({
      list: [...this.data.list, { name: this.data.title, age: Math.random() }]
    })
  },
  del(e) {
    const { index } = e.target.dataset
    const list = [...this.data.list]
    list.splice(index, 1)
    this.setData({ list })
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