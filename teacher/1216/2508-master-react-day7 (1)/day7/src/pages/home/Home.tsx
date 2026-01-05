import { Button, Space } from 'antd'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Space>
        <Link to="/exam"><Button type="primary">开始考试</Button></Link>
        <Link to="/history"><Button>历史记录</Button></Link>
      </Space>
    </div>
  )
}

export default Home