import React from 'react'
import { Navigate } from 'react-router-dom'

type Props = {
  children: React.ReactNode
}

const Auth = (props: Props) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return props.children
}

export default Auth