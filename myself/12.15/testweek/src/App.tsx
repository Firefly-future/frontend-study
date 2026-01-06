import React, { Suspense } from "react"
import { useRoutes } from "react-router-dom"
import router from "./router"
const App = () => {
  const routes = useRoutes(router)
  return (
    <Suspense
      fallback={
        <div style={{ color: "red", fontSize: "30px" }}>loading...</div>
      }
    >
      {routes}
    </Suspense>
  )
}

export default App
