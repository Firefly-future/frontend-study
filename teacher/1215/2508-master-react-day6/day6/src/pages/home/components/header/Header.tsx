import React, { useEffect, useState } from 'react'
import style from './Header.module.scss'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { menuList, type NavItem } from '../../constants'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [navList, setNavList] = useState<NavItem[]>([])

  useEffect(() => {
    const curNav = menuList.find(v => v.path === location.pathname)
    if (curNav) {
      setNavList(prev => {
        if (prev.find(v => v.path === location.pathname)) {
          return prev
        } else {
          return [...prev, curNav]
        }
      })
    }
  }, [location.pathname])
  
  const remove = (path: string, index: number) => {
    if (navList.length === 1) {
      setNavList([])
      navigate('/login')
      return
    }
    if (index === navList.length - 1) {
      navigate(navList[index - 1].path)
    } else {
      navigate(navList[index + 1].path)
    }
    setNavList(navList.filter(v => v.path !== path))
  }

  return (
    <div className={style.header}>
      <div className={style.user_info}>
        <span>admin</span>
        <span onClick={() => {
          localStorage.removeItem('token')
          navigate('/login')
        }}>退出登录</span>
      </div>
      <div className={style.nav}>
        {navList.map((item, index) =>
          <NavLink key={item.path} to={item.path}>
            {item.title}
            <span onClick={e => {
              e.preventDefault()
              remove(item.path, index)
            }}>x</span>
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default Header