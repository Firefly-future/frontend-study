import React from "react"
import { NavLink, Outlet } from "react-router-dom"
import style from "./money.module.scss"

const MoneyCon = () => {
  return (
    <div className={style.moneyCon}>
      <div className={style.nav}>
        <NavLink to="group">资金组成</NavLink>
        <NavLink to="loop">资金流向</NavLink>
        <NavLink to="coming">资金来源</NavLink>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MoneyCon
