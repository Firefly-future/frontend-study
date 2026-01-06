import { useEffect, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { message, Spin } from "antd"
import { Layout, Menu, theme } from "antd"
import { UserOutlined, DownOutlined, SettingOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Dropdown } from "antd"

import { useSelector, useDispatch } from "react-redux"
import { fetchUserInfo, resetUser } from "@/store/modules/userInfo"
import type { RootDispatch, RootState } from "@/store"

const { Header, Content } = Layout
const menuItems = [
  {
    key: "home",
    label: (
      <NavLink to="home" style={{ color: "inherit" }}>
        首页
      </NavLink>
    ),
  },
  {
    key: "consumerList",
    label: (
      <NavLink to="consumerList" style={{ color: "inherit" }}>
        用户列表
      </NavLink>
    ),
  },
  {
    key: "user",
    label: (
      <NavLink to="user" style={{ color: "inherit" }}>
        用户中心
      </NavLink>
    ),
  },
]

const menuList = Array.from({ length: 3 }).map((_, index) => ({
  key: menuItems[index].key,
  label: menuItems[index].label,
}))
const Home = () => {
  const location = useLocation()
  // console.log(location.pathname)
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useDispatch<RootDispatch>()
  const { user, error, loading } = useSelector(
    (state: RootState) => state.userInfo
  )
  // console.log(user)

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()
  const token = localStorage.getItem("token")
  const menuStyle = {
    "--ant-menu-item-color": "#F5FFFD", // 未选中项颜色
    "--ant-menu-item-hover-color": "#DBFDFF", // 悬浮项颜色
    "--ant-menu-item-active-color": "#fff", // 选中项颜色
    "--ant-menu-selected-item-bg": "#436DBB", // 选中项背景
    "--ant-menu-item-selected-color": "#fff", // 选中项文字（关键新增）
    backgroundColor: "#6284E0",
    flex: 1,
    minWidth: 0,
  } as React.CSSProperties

  const handleGoout = () => {
    messageApi.open({
      type: "success",
      content: "退出登录成功",
    })
    setTimeout(() => {
      localStorage.removeItem("token")
      navigate("/")
    }, 1000)
  }
  const handleFollow = () => {
    messageApi.open({
      type: "success",
      content: "点击了关注",
    })
  }
  const handleSetConsumer = () => {
    messageApi.open({
      type: "success",
      content: "点击了账号设置",
    })
  }
  const listItem: MenuProps["items"] = [
    {
      key: "1",
      label: <a onClick={() => navigate("/home/user")}>个人中心</a>,
      icon: <SettingOutlined />,
    },
    {
      key: "2",
      label: <a onClick={() => handleFollow()}>关注</a>,
      icon: <SettingOutlined />,
    },
    {
      key: "3",
      label: <a onClick={() => handleSetConsumer()}>账号设置</a>,
      icon: <SettingOutlined />,
    },
    {
      key: "4",
      label: <a onClick={() => handleGoout()}>退出登录</a>,
      icon: <SettingOutlined />,
    },
  ]
  useEffect(() => {
    dispatch(fetchUserInfo())
    if (token) {
      messageApi.open({
        type: "success",
        content: `登录成功，欢迎${user?.username}`,
      })
    } else {
      messageApi.open({
        type: "error",
        content: "登录信息过期，请重新登录",
      })
      dispatch(resetUser())
    }
  }, [dispatch, token, messageApi])
  if (loading) {
    return <Spin></Spin>
  }
  return (
    <div>
      {contextHolder}
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#6284E0",
            color: "#fff",
          }}
        >
          <div className="demo-logo" style={{ color: "#fff" }} />
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname.split("/")[2]]}
            items={menuList}
            style={menuStyle}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            欢迎
            <span
              style={{
                textDecoration: "underline",
                color: "blue",
                marginLeft: "10px",
              }}
              onClick={() => navigate("/home/user")}
            >
              {user?.username}
            </span>
            {/* <UserOutlined
              style={{ fontSize: "30px", marginLeft: "15px" }}
            />{" "} */}
            <img
              src={user?.avatar}
              alt=""
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginLeft: "10px",
              }}
            />
            <Dropdown menu={{ items: listItem }}>
              <a onClick={(e) => e.preventDefault()}>
                <DownOutlined style={{ color: "#fff", marginLeft: "5px" }} />
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content>
          <div
            style={{
              background: colorBgContainer,
              height: "calc(100vh - 64px)",
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </div>
  )
}

export default Home
