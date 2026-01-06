import { lazy } from "react"

import { Navigate } from "react-router-dom"

import Login from "@/pages/login/Login"
import Home from "@/pages/home/Home"
import Register from "@/pages/login/components/register/Register"
import Index from "@/pages/index/Index"
import NotFound from "@/pages/404/404"

const User = lazy(() => import("@/pages/user/User"))
const ComsumerList = lazy(() => import("@/pages/consumerList/ConsumerList"))

import Auth from "./Auth"

export default [
  { path: "/", element: <Login />, },
  { path: "/register", element: <Register /> },
  {
    path: "/home",
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
    children: [
      { path: "home", element: <Index /> },
      { path: "user", element: <User /> },
      { path: "consumerList", element: <ComsumerList /> },
    ],
  },
  { path: "/404", element: <NotFound /> },
  { path: "*", element: <Navigate to="/404" /> },
]
