import React, { Suspense } from 'react'
import router from './router'
import { useRoutes } from 'react-router-dom'
import { Spin } from 'antd'

const App = () => {
  const routes=useRoutes(router)
  return (
    <Suspense fallback={<Spin fullscreen />}>
      {routes}
    </Suspense>
  )
}

export default App