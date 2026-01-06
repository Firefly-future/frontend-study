import React from 'react'
import { Layout } from 'antd'
import Header from './components/header/Header'
import Menu from './components/menu/Menu'

const { Content } = Layout

interface Props {
  children: React.ReactNode
}

const LayoutPage: React.FC<Props> = (props) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header />
      <Layout>
        <Menu />
        <Content style={{ padding: 20 }}>{props.children}</Content>
      </Layout>
    </Layout>
  )
}

export default LayoutPage