import { useRoutes } from 'react-router-dom'
import routerConfig from './router'


const App = () => {
  const routes = useRoutes(routerConfig)

  return routes
}

export default App