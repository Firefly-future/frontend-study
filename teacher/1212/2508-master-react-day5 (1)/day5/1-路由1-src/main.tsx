import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  // 路由根组件，项目中只需要调用一次，所有路由相关的内容必须在根组件内使用
  BrowserRouter as Router, // history 模式，url 不带 #
  HashRouter // hash 模式，url 有 #
} from 'react-router-dom'
import './index.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <App />
  </HashRouter>
)
