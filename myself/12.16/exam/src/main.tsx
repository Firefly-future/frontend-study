import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.scss"
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx"
import store from "./store"
import { Provider } from "react-redux"

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
