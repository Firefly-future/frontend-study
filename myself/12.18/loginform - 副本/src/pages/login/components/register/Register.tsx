import { useEffect, useRef, useState } from "react"
import { Button, message, Form, Input } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import type { FormInstance, FormProps } from "antd"
import style from "./register.module.scss"
import { registerApi } from "@/services"

type FieldType = {
  username?: string
  password?: string
  confirm?: string
}

const Register = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  console.log(location.state)
  const [messageApi, contextHolder] = message.useMessage()
  const formRef = useRef<FormInstance<FieldType>>(null)
  const success = () => {
    messageApi.open({
      type: "success",
      content: "注册成功, 3秒后跳转到登录页面",
    })
  }
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values)
    try {
      setLoading(true)
      const res = await registerApi(values)
      console.log(res)
      if (res.data.code === 0) {
        success()
        formRef.current?.resetFields()
        setTimeout(() => {
          setLoading(false)
          navigate("/", { replace: true })
        }, 3000)
      } else {
        setLoading(false)
        messageApi.open({
          type: "error",
          content: res.data.msg,
        })
      }
    } catch (error) {
      console.log(error)
      messageApi.open({
        type: "error",
        content: "网络异常，注册失败，请检查网络后重试",
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
    return () => {
      if (formRef.current) {
        formRef.current.resetFields()
      }
    }
  }, [navigate])
  return (
    <div className={style.registerContainer}>
      {" "}
      {contextHolder}
      <Form
        ref={formRef}
        className={style.registerForm}
        name="登录"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValues={{
          username: "",
          password: "",
          confirm: "",
        }}
      >
        <h2>注册</h2>
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
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error("两次密码不一致!"))
              },
            }),
          ]}
        >
          <Input.Password placeholder="请确认密码" />
        </Form.Item>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" block loading={loading}>
            注册
          </Button>
        </Form.Item>
        <Form.Item label={null}>
          <Button
            type="link"
            htmlType="button"
            block
            onClick={() => navigate("/")}
          >
            已经有账号？去登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
