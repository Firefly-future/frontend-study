import { useEffect, useState } from "react"
import { Button, message, Form, Input } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import type { FormProps } from "antd"
import style from "./login.module.scss"
import { loginApi } from "@/services"

type FieldType = {
  username?: string
  password?: string
}

const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  console.log(location.state)
  const [messageApi, contextHolder] = message.useMessage()
  const error = () => {
    messageApi.open({
      type: "error",
      content: "登录信息过期，请重新登录",
    })
  }
  const success = () => {
    messageApi.open({
      type: "success",
      content: "登录成功",
    })
  }
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values)
    try {
      setLoading(true)
      const res = await loginApi(values)
      console.log('Login response data:', res.data)
      if (res.data.code === 0) {
        // 存储实际的token而不是用户名
        const token = res.data.token || ""
        console.log('Storing token:', token)
        localStorage.setItem("token", token)
        success()
        setLoading(false)
        setTimeout(() => {
          navigate("/home/home")
        }, 1000)
      } else {
        messageApi.open({
          type: "error",
          content: res.data.msg || "登录失败",
        })
        setLoading(false)
      }
    } catch (error) {
      console.error('Login error:', error)
      messageApi.open({
        type: "error",
        content: "网络连接失败，请检查网络设置",
      })
      setLoading(false)
    }
  }

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo)
  }

  useEffect(() => {
    const errorState = location.state?.error
    if (errorState) {
      error()
      navigate(location.pathname, { replace: true, state: {} })
    }
  }, [location.state, messageApi, navigate, location.pathname])

  return (
    <div className={style.loginContainer}>
      {" "}
      {contextHolder}
      <Form
        className={style.loginForm}
        name="登录"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h2>登录</h2>
        <Form.Item<FieldType>
          name="username"
          rules={[
            { required: true, message: "请输入用户名!" },
            { min: 3, max: 12, message: "用户名长度必须在3-12位之间" },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[
            { required: true, message: "请输入密码!" },
            { min: 3, max: 12, message: "密码长度必须在3-12位之间" },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" block loading={loading}>
            登录
          </Button>
        </Form.Item>
        <Form.Item label={null}>
          <Button
            type="link"
            htmlType="button"
            block
            onClick={() => navigate("/register")}
          >
            没有账号？去注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
