import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./style.scss"
import { Provider } from "./store/index.jsx"
createRoot(document.getElementById("root")).render(
	<Provider>
		<App />
	</Provider>
)
