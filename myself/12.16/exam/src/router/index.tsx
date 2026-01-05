import React, { lazy } from "react"

import Home from "../pages/home/Home"
import NotFound from "../pages/404/404"
import { Navigate } from "react-router-dom"
const History = lazy(() => import("../pages/history/History"))
const Exam = lazy(() => import("../pages/exam/Exam"))
const Mistakes = lazy(() => import("../pages/mistakes/Mistakes"))

export default [
  { path: "/", element: <Home /> },
  { path: "/exam", element: <Exam /> },
  { path: "/history", element: <History /> },
  { path: "/mistakes", element: <Mistakes /> },
  { path: "/404", element: <NotFound /> },
  { path: "*", element: <Navigate to="/404" /> }
]
