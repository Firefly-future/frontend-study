import router from "./router"
import { Suspense } from "react"
import { useRoutes } from "react-router-dom"
import { Spin } from "antd"

const App = () => {
  const routes = useRoutes(router)
  return (
    <Suspense
      fallback={
        <div>
          <Spin />
        </div>
      }
    >
      {routes}
    </Suspense>
  )
}

export default App
