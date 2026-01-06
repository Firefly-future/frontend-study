import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Cinema from "./pages/cinema/Cinema"
import Film from "./pages/film/Film"
import Mine from "./pages/mine/Mine"
import Detail from "./pages/detail/Detail"
import { Routes,Route, Navigate } from "react-router-dom"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}>
      {/* 二级路由 */}
        <Route path="/" element={<Film />}></Route>
        <Route path="/cinema" element={<Cinema />}></Route>
        <Route path="/mine" element={<Mine />}></Route>
      </Route>
      <Route path="/login" element={<Login />}></Route>
      {/* 路径冒号id 动态路由 */}
      <Route path="/detail/:id" element={<Detail />}></Route>

      {/* 重定向 */}
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  )
}

export default App
