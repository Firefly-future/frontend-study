import React from "react"
import { Result, Button } from "antd"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，此页面资源不存在"
        extra={<Button type="primary" onClick={()=>{navigate("/")}}>回到首页</Button>}
      />
    </div>
  )
}

export default NotFound
