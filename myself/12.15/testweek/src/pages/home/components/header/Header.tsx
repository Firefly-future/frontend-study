import React, { useEffect, useState } from "react"
import style from "./header.module.scss"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { menuList } from "../../constans"
import type { NavItem } from "../../constans"
const Header = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const location = useLocation()
  const pathname = location.pathname
  const [list, setList] = useState<NavItem[]>([])
  
  const remove = (path: string, index: number) => {
    const isActive = path === pathname
    if(!isActive) {
      setList(list.filter((v) => v.path !== path))
      return
    }
    if (list.length === 1) {
      setList([])
      navigate("/login")
      return
    }
    if ( index === list.length - 1) {
      navigate(list[index - 1]?.path)
    } else {
      navigate(list[index + 1]?.path)
    }
    setList(list.filter((v) => v.path !== path))
  }

  useEffect(() => {
    const curNav = menuList.find((v) => v.path === pathname)
    console.log(curNav, pathname)
    if (curNav) {
      setList((prev) => {
        if (prev.find((item) => item.path === pathname)) {
          return prev
        } else {
          return [...prev, curNav]
        }
      })
    }
  }, [pathname])
  return (
    <div className={style.header}>
      <div className={style.userinfo}>
        <div>{token} </div>|
        <div
          onClick={() => {
            localStorage.removeItem("token")
            navigate("/login")
          }}
        >
          退出
        </div>
      </div>
      <div className={style.nav_title}>
        {list.map((item, index) => {
          return (
            <NavLink key={item.path} to={item.path}>
              {item.title}{" "}
              <span
                onClick={(e) => {
                  e.preventDefault()
                  remove(item.path, index)
                }}
              >
                x
              </span>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default Header
