import router from './router'
import { useLocation, useRoutes } from 'react-router-dom'
import { useUserStore } from '@/store/userStore'
import { useEffect } from 'react'

const LoginPath = '/user/login'

const App = () => {
  // const { getUserInfo } = useUserStore()
  const getUserInfo = useUserStore(state => state.getUserInfo)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== LoginPath) {
      getUserInfo()
    }
  }, [])

  return useRoutes(router)
}

export default App