import { useEffect, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, message } from 'antd'
import { getVerificationCode, userLogin } from '@/services'
import type { LoginParams } from '@/services/types'
import { API_CODE } from '@/constants'
import { useNavigate } from 'react-router-dom'
import { setToken } from '@/utils'
import { useUserStore } from '@/store/userStore'


const Login = () => {
  const [form] = Form.useForm()
  const [captcha, setCaptcha] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const getUserInfo = useUserStore(state => state.getUserInfo)
  

  const getImgCode = async () => {
    try {
      const res = await getVerificationCode()
      console.log(res.data.code)
      if (res.code === 200) {
        setCaptcha(res.data.code)
      } else {
        message.error(res.msg)
      }
    } catch(e) {
      console.log(e)
    }
  }

  const onFinish = async (values: LoginParams) => {
    try {
      setLoading(true)
      const res = await userLogin(values)
      if (res.code === API_CODE.SUCCESS) {
        message.success('登陆成功！')
        setToken(res.data.token)
        getUserInfo()
        navigate('/')
      } else if (res.code === API_CODE.EXPIRED_CAPTCHA) {
        message.error(res.msg)
        getImgCode()
      } else {
        message.error(res.msg)
      }
    } catch(e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getImgCode()
  }, [])
  

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        style={{ width: 300 }}
        onFinish={onFinish}
      >
        <Form.Item>
          <h2 style={{ textAlign: 'center' }}>登录考试平台</h2>
        </Form.Item>

        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名!', validateTrigger: 'onChange' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
        </Form.Item>

        <Form.Item>
          <Flex justify="space-between" gap={20} align="center">
            <Form.Item name="code" noStyle rules={[{ required: true, message: '请输入验证码！' }]}>
              <Input placeholder="验证码" autoComplete="off" />
            </Form.Item>
            <div onClick={getImgCode} style={{ width: 100, height: 32, flexShrink: 0, borderRadius: 6, backgroundImage: `url(${captcha})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', border: '1px solid #d9d9d9' }}></div>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button loading={loading} block type="primary" onClick={async () => {
            console.log(form)
            form.submit()
            // const value = await form.validateFields()
            // console.log('校验通过', value)
          }}>登陆</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login