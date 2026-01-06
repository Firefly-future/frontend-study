import Layout from '@/layout/Layout'
import Login from '../pages/login/Login'
import NotFound from '../pages/404/NotFound'
import Dashboard from '@/pages/dashboard/Dashboard'
import Users from '@/pages/users/UserList'
import RoleList from '@/pages/role/RoleList'
import Permission from '@/pages/permission/Permission'

const routes = [
  {
    path: '/',
    element: <Layout><Dashboard /></Layout>
  },
  {
    path: '/users',
    element: <Layout><Users /></Layout>
  },
  {
    path: '/role',
    element: <RoleList />
  },
  {
    path: '/permission',
    element: <Permission />
  },
  {
    path: '/user/login',
    element: <Login />
  },
  {
    path: '/user/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default routes