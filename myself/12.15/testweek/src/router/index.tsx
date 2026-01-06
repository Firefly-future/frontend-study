import React, { lazy } from "react"
import { Navigate } from "react-router-dom"
import Login from "../pages/login/Login"
import Home from "../pages/home/Home"
import Group from "../pages/group/Group"
// import Loop from "../pages/loop/Loop"
// import Coming from "../pages/come/Coming"
// import User from "../pages/user/User"
import Auth from "./Auth"

//组件懒加载/异步组件
//减少主包体积，提高首屏加载速度
const Loop=React.lazy(()=>import(`../pages/loop/Loop`))
const Coming=React.lazy(()=>import(`../pages/come/Coming`))
const User=lazy(()=>import(`../pages/user/User`))


export default [
  {
    path: "/",
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
    children: [
      { path: "/", element: <Group /> },
      { path: "/loop", element: <Loop /> },
      { path: "/coming", element: <Coming /> },
      { path: "/user", element: <User /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <Navigate to="/" /> },
]
