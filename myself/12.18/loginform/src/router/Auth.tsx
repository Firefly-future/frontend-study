import React from "react"
import { Navigate } from "react-router-dom"

type Props = {
  children: React.ReactNode
}

const Auth = (props: Props) => {
  const token = localStorage.getItem("token")

  if (!token) {
    return (
      <div>
        <Navigate to="/" state={{ error: true }} replace />
      </div>
    )
  }
  return props.children
}

export default Auth
