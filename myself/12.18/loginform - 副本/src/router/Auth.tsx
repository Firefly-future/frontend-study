import React from "react"
import { Navigate } from "react-router-dom"

type Props = {
  children: React.ReactNode
}

const Auth = (props: Props) => {
  console.log('Auth component: Checking token...')
  const token = localStorage.getItem("token")
  console.log('Auth component: Token exists:', !!token)
  console.log('Auth component: Token value:', token)

  if (!token) {
    console.log('Auth component: No token found, redirecting to login')
    return <Navigate to="/" state={{ error: true }} replace />
  }
  console.log('Auth component: Token found, rendering children')
  return props.children
}

export default Auth
