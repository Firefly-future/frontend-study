import { useMemo, useState } from 'react'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useUserStore } from '@/store/userStore'
import type { MenuListItem } from '@/services/types'
import { IconEnum } from '@/constants/icons'


const formatMenuList = (list: MenuListItem[]): MenuProps['items'] => {
  return list.map(item => {
    const other = item.children ? { children: formatMenuList(item.children) } : {}
    return {
      label: item.name,
      key: item.path,
      icon: IconEnum[item.icon],
      ...other
    }
  })
}

const SiderMenu = () => {
  const [collapsed, setCollapsed] = useState(false)
  const userMenuList = useUserStore(state => state.menuList)
  
  const menuList = useMemo(() => formatMenuList(userMenuList), [userMenuList])
  
  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
      width={250}
      theme="light"
    >
      <Menu
        defaultSelectedKeys={['bbb', 'b222']}
        defaultOpenKeys={['bbb', 'b222']}
        mode="inline"
        items={menuList}
      />
    </Layout.Sider>
  )
}

export default SiderMenu