import { createRoot } from "react-dom/client"
import "./index.scss"
import App from "./App.tsx"
import { BrowserRouter, HashRouter } from "react-router-dom"
// 路由根组件，项目中仅需调用一次，所有路有相关的内容必须在根组件内使用
// BrowserRouter history模式 url中不包含#号
// HashRouter 哈希路由  url中包含#号

createRoot(document.getElementById("root")!).render(
	<HashRouter>
		<App />
	</HashRouter>
)
