import { Navigate } from "react-router-dom"

import Auth from "./Auth"
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import Cinema from "../pages/cinema/Cinema"
import Film from "../pages/film/Film"
import Mine from "../pages/mine/Mine"
import Detail from "../pages/detail/Detail"

interface RouteItem {
	path: string
	element: React.ReactNode
	children?: RouteItem[]
	isAuth?: boolean
}

// const routes = [
// 	{
// 		path: "/",
// 		element: <Home />,
// 		children: [
// 			{ path: "/", element: <Film /> },
// 			{ path: "/cinema", element:
// 				<Auth> <Cinema /></Auth> },   //                 Auth 可以给需要判断的夹在中间
// 			{ path: "/mine", element: <Auth><Mine /> </Auth> },
// 		],
// 	},
// 	{
// 		path: "/login",
// 		element: <Login />,
// 	},
// 	{
// 		path: "/detail/:id",
// 		element: <Auth> <Detail /> </Auth>,
// 	},
// 	{
// 		path: "*",
// 		element: <Navigate to="/" />,
// 	},
// ]

const routes: RouteItem[] = [
	{
		path: "/",
		element: <Home />,
		children: [
			{ path: "/", element: <Film /> },
			{ path: "/cinema", element: <Cinema />, isAuth: true },
			{ path: "/mine", element: <Mine />, isAuth: true },
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/detail/:id",
		element: <Detail />,
		isAuth: true,
	},
	{
		path: "*",
		element: <Navigate to="/" />,
	},
]

const formatRoutes = (list: RouteItem[]) => {
	return list.map((item) => {
		if (item.children && item.children.length > 0) {
			item.children = formatRoutes(item.children)
		}
		if (item.isAuth) {
			return {
				...item,
				element: <Auth> {item.element} </Auth>,
			}
		}
		return item
	})
}
const routeConfig = formatRoutes(routes)

export default routeConfig
