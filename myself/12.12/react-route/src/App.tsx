
import { useRoutes } from "react-router-dom"

import routeConfig from './router/index'
function App() {
	const routes = useRoutes(routeConfig)
	return routes

	// 一种写法
	// return (
	//   <Routes>
	//     <Route path="/" element={<Home />}>
	//     {/* 二级路由 */}
	//       <Route path="/" element={<Film />}></Route>
	//       <Route path="/cinema" element={<Cinema />}></Route>
	//       <Route path="/mine" element={<Mine />}></Route>
	//     </Route>
	//     <Route path="/login" element={<Login />}></Route>
	//     {/* 路径冒号id 动态路由 */}
	//     <Route path="/detail/:id" element={<Detail />}></Route>

	//     {/* 重定向 */}
	//     <Route path="*" element={<Navigate to="/" />}></Route>
	//   </Routes>
	// )
}

export default App
