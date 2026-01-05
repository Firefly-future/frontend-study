import React from "react"
import style from "./home.module.scss"
import Side from "./components/side/Side"
import Header from "./components/header/Header"
import { Outlet } from "react-router-dom"
import { Suspense } from "react"
const home = () => {
  return (
    <div className={style.home}>
      <Side />
      <main>
        <Header />
        <div className={style.router}>
          <Suspense fallback={<div style={{color:"green" , fontSize:"30px"}}>loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

export default home
