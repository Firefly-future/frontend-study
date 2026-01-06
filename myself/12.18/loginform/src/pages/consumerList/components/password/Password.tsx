import { Button } from "antd"
import React, { useState } from "react"
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"
import style from "./password.module.scss"

const Password = ({ password }: { password: string }) => {
  const [passwordDisplay, setPasswordDisplay] = useState(false)
  return (
    <div className={style.passwordContainer}>
      {passwordDisplay ? password : "******"}
      <Button
        type="link"
        icon={
          passwordDisplay ? (
            <EyeOutlined style={{ fontSize: 16,marginLeft:35 }} />
          ) : (
            <EyeInvisibleOutlined style={{ fontSize: 16,marginLeft:35  }} />
          )
        }
        onClick={() => setPasswordDisplay(!passwordDisplay)}
      />
    </div>
  )
}

export default Password
