import React from 'react'
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Detail from './pages/detail/Detail'
import Film from './pages/film/Film'
import Cinema from './pages/cinema/Cinema'
import Mine from './pages/mine/Mine'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Film />} />
        <Route path="/cinema" element={<Cinema />} />
        <Route path="/mine" element={<Mine />} />
      </Route>
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/login" element={<Login />} />
      {/* 重定向 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App