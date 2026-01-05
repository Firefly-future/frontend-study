import React from "react"
import { Navigate } from "react-router-dom"

interface props {
  children:React.ReactNode
}

const Auth = (props:props) => {
  const token = localStorage.getItem("token")
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return props.children
}

export default Auth
