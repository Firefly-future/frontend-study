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

  options: {
    // 允许使用多个slot
    multipleSlots: true
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
      console.log('点击按钮', num)
      // 调用父组件传入的自定义事件
      this.triggerEvent('changeCount', { num })
    }
  },
  // 组件的生命周期
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 组件所在页面的生命周期
  pageLifetimes: {
    show: function() {
      // 页面被展示
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }
})