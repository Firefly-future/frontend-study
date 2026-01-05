import React from "react"
import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="链接错误，页面不存在"
        extra={
          <Button type="primary" onClick={() => navigate("/index/first")}>
            返回首页
          </Button>
        }
      />
    </div>
  )
}

export default NotFound
