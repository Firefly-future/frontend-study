import React from "react"
import { Suspense } from "react"
import router from "./router"
import { Spin } from "antd"
import { useRoutes } from "react-router-dom"
const App = () => {
  const routes = useRoutes(router)
  return (
    <div>
      <Suspense fallback={<Spin />}>{routes}</Suspense>
    </div>
  )
}

export default App
