// components/button-counter/button-counter.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    price: Number,
    count: Number
  },

  options:{
    multipleSlots:true
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlClick(e) {
      const { num } = e.target.dataset
      console.log('点击按钮', e)
    //  父组件传入的自定义事件
    this.triggerEvent('changeCount',{num})
    }
  }
})