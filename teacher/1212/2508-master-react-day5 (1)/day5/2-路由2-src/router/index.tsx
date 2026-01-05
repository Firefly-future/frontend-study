import { Navigate } from 'react-router-dom'
import Auth from './Auth'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Detail from '../pages/detail/Detail'
import Film from '../pages/film/Film'
import Cinema from '../pages/cinema/Cinema'
import Mine from '../pages/mine/Mine'

interface RouteItem {
  path: string
  element: React.ReactNode,
  children?: RouteItem[]
  isAuth?: boolean
}

// const routes = [
//   {
//     path: '/',
//     element: <Home />,
//     children: [
//       { path: '/', element: <Film /> },
//       { path: '/cinema', element: <Auth><Cinema /></Auth> },
//       {
//         path: '/mine',
//         element: (
//           <Auth>
//             <Mine />
//           </Auth>
//         )
//       }
//     ]
//   },
//   { path: '/detail/:id', element: <Auth><Detail /></Auth> },
//   { path: '/login', element: <Login /> },
//   { path: '*', element: <Navigate to="/" /> }
// ]


const routes: RouteItem[] = [
  {
    path: '/',
    element: <Home />,
    children: [
      { path: '/', element: <Film /> },
      { path: '/cinema', isAuth: true, element: <Cinema />
      },
      {
        path: '/mine',
        element: <Mine />,
        isAuth: true
      }
    ]
  },
  { path: '/detail/:id', isAuth: true, element: <Detail /> },
  { path: '/login', element: <Login /> },
  { path: '*', element: <Navigate to="/" /> }
]

const formatRoutes = (list: RouteItem[]) => {
  return list.map(item => {
    if (item.children && item.children.length > 0) {
      item.children = formatRoutes(item.children)
    }
    if (item.isAuth) {
      return {
        ...item,
        element: <Auth>{item.element}</Auth>
      }
    }
    return item
  })
}


const routerConfig = formatRoutes(routes)

export default routerConfig