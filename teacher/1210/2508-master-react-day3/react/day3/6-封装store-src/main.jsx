import { createRoot } from 'react-dom/client'
import App from './App'
import './index.scss'
import { Provider } from './store'

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider>
    <App />
  </Provider>
)
