import { createApp } from 'vue'
import App from './App.vue'
import './style/common.scss'
import copy from './directives/copy'

const app = createApp(App)

// 注册全局指令
// 使 v-copy 在所有组件中都可用
app.directive('copy', copy)


app.mount('#app')


