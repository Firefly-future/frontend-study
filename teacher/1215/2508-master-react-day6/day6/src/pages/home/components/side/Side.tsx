import React, { useEffect, useMemo, useState } from 'react'
import style from './Side.module.scss'
import { menuTab, menuList } from '../../constants'
import classNames from 'classnames'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const Side = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  // 使用当前路由去所有列表中查找
  const curItem = useMemo(() => menuList.find(v => v.path === location.pathname), [location.pathname])

  useEffect(() => {
    const index = menuTab.findIndex(item => item.list.find(v => v.path === location.pathname))
    setActiveIndex(index)
  }, [location.pathname])

  return (
    <div className={style.side}>
      <div className={style.title_bar}>
        {menuTab.map((item, index) =>
          <div
            key={item.title}
            className={classNames(style.title_bar_item, {
              [style.active]: activeIndex === index
            })}
            onClick={() => {
              if (index !== activeIndex) {
                navigate(menuTab[index].list[0].path)
                setActiveIndex(index)
                console.log(menuTab[index].list[0])
              }
            }}
          >
            <p>{item.icon}</p>
            <p>{item.title}</p>
          </div>
        )}
      </div>
      <div className={style.title_list}>
        <h3>{curItem?.title}</h3>
        <ul>
          {menuTab[activeIndex].list.map(item => 
            <li key={item.path}>
              <NavLink to={item.path}>{item.title}</NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Side