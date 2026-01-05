import React from 'react'
import { Navigate } from 'react-router-dom'

type props={
  children:React.ReactNode
}

const Auth = (props:props) => {
  const token=localStorage.getItem('token')
  if(!token){
    return <Navigate to ="/login" />
  }
  return props.children
}

export default Auth