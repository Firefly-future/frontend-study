import { Result, Button } from 'antd'

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="访问的页面不存在"
      extra={<Button type="primary">返回首页</Button>}
    />
  )
}

export default NotFound