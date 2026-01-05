import React from "react"
import style from "./control.module.scss"
import { NavLink, Outlet } from "react-router-dom"
const Control = () => {
  return (
    <div className={style.control}>
      <div className={style.nav}>
        <NavLink to="user">用户管理</NavLink>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Control
