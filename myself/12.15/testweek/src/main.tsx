import { createRoot } from "react-dom/client"
import "./index.scss"
import App from "./App.tsx"
import { BrowserRouter } from "react-router-dom"
// 状态管理的数据
import store from "./store/index.ts"
// 把状态管理的数据提供给所有的组件
import { Provider } from "react-redux"

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
