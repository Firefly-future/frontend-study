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

createApp(App).mount('#app')
