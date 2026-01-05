import { Navigate } from 'react-router-dom'
import Login from "../pages/login/Login"
import Home from "../pages/home/Home"
import Child1 from "../pages/child1/Child1"
import Child2 from "../pages/child2/Child2"
import Child3 from "../pages/child3/Child3"
import Child4 from "../pages/child4/Child4"
import Child5 from "../pages/child5/Child5"
import Auth from './Auth'

export default [
  {
    path: '/',
    element: (
      <Auth>
        <Home />
      </Auth>
    ),
    children: [
      { path: '/', element: <Child1 /> },
      { path: '/child2', element: <Child2 /> },
      { path: '/child3', element: <Child3 /> },
      { path: '/child4', element: <Child4 /> },
      { path: '/child5', element: <Child5 /> }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
]