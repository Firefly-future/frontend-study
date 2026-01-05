import React from "react"
import style from "./home.module.scss"
import { Button, Space } from "antd"
import { Link } from "react-router-dom"
const Home = () => {
  return (
    <div className={style.home}>
      <Space>
        <Link to="/exam">
          <Button type="primary">开始考试</Button>
        </Link>
        <Link to="/history">
          <Button>历史记录</Button>
        </Link>
      </Space>
    </div>
  )
}

export default Home
