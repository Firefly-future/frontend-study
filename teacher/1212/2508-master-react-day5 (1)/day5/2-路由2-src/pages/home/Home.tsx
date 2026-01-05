import React from 'react'
import {
  Outlet,
  Link,
  NavLink
} from 'react-router-dom'

const Home = () => {
  return (
    <div className="home">
      <main>
        <Outlet />
      </main>
      <footer>
        <NavLink to="/">电影</NavLink>
        <NavLink to="/cinema">影院</NavLink>
        <NavLink to="/mine">我的</NavLink>
      </footer>
    </div>
  )
}

export default Home