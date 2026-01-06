import React from 'react'
import { Outlet } from 'react-router-dom'
import style from './Home.module.scss'
import Side from './components/side/Side'
import Header from './components/header/Header'

const Home = () => {
  return (
    <div className={style.home}>
      <Side />
      <main>
        <Header />
        <div className={style.router_wrap}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Home