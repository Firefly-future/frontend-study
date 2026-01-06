import { Layout, Space, Avatar, Dropdown } from 'antd'
import { UserOutlined, SettingOutlined, PoweroffOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useUserStore } from '@/store/userStore'
import { removeToken } from '@/utils'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const userInfo = useUserStore(state => state.userInfo)
  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '个人设置',
      icon: <SettingOutlined />,
      onClick: () => {
        alert('跳转页面')
      }
    },
    {
      key: '2',
      danger: true,
      icon: <PoweroffOutlined />,
      label: '退出登陆',
      onClick: () => {
        removeToken()
        navigate('/user/login', { replace: true })
      }
    }
  ]

  return (
    <Layout.Header style={{ padding: '0 20px', color: '#fff', height: 48, lineHeight: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Space style={{ height: 48, alignItems: 'center' }} className="logo">
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" height={36} alt="logo" />
        </div>
        <span>考试系统</span>
      </Space>
      <Dropdown menu={{ items }} arrow>
        <Space style={{ height: 48 }}>
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} src={userInfo?.avator} />
          <span>{userInfo?.username}</span>
        </Space>
      </Dropdown>
    </Layout.Header>
  )
}

export default Header