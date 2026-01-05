import { createApp } from 'vue'
import App from './App.vue'
// vue 组件：template 布局、style 样式、 script js逻辑

// vue: MVVM 框架， model、view、view-model
// 1. 数据驱动视图（数据改变，页面自动更新）
// 2. 数据双向绑定
// 3. 组件化开发

// 数据插值：{{ }} 中可以直接渲染 vue 定义的响应式数据
// <h1>{{ htmlstr }} 12343232</h1>

// 指令：以 v- 开头的特殊的属性
// 作用：vue 帮用户实现 dom 操作
// 1. v-text 相当于 元素.textContent
// 2. v-html 相当于 元素.innerHTML
// 3. v-show 显示/隐藏 dom，添加删除 display：none
// 4. v-if 添加删除 dom
// 5. v-for 渲染列表
// 6. v-on 绑定事件，简写 @
// 7. v-bind 简写:,绑定元素属性，让属性可以使用变量
// 8. v-model 表单双向绑定修饰符：lazy、trim、number
//    v-model 本质上是 value 和 input 事件的简写


// ref 获取dom元素
// <h1 ref="title">{{ title }}</h1>
// js 中通过 this.$refs.title

createApp(App).mount('#app')
