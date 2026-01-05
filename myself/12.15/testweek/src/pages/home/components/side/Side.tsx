import React, { useEffect, useMemo, useState } from "react"
import style from "./side.module.scss"
import { menuTab, menuList } from "../../constans"
import classNames from "classnames"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
const Side = () => {
  const navigate = useNavigate()
  const [activeIndex, setActiveIndex] = useState(0)
  const location = useLocation()
  // console.log(location)
  const pathname = location.pathname
  const curItem = useMemo(
    () => menuList.find((v) => v.path === pathname),
    [pathname]
  )
  useEffect(()=>{
    const index=menuTab.findIndex(item=>item.list.find(v=>v.path===pathname))
    console.log(index,pathname)
    setActiveIndex(index)
  },[pathname])
  return (
    <div className={style.side}>
      <div className={style.title}>
        {menuTab.map((item, index) => {
          return (
            <div
              key={item.title}
              className={classNames(style.title_bar, {
                [style.active]: activeIndex === index,
              })}
              onClick={() => {
                if (index !== activeIndex) {
                  navigate(menuTab[index]?.list[0].path)
                  setActiveIndex(index)
                }
              }}
            >
              <p>{item.title}</p>
              <p>{item.icon} </p>
            </div>
          )
        })}
      </div>
      <div className={style.nav}>
        <h3>{curItem?.title}</h3>
        <ul>
          {menuTab[activeIndex]?.list.map((item) => {
            return (
              <li key={item.title}>
                <NavLink to={item.path}>{item.title}</NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Side
