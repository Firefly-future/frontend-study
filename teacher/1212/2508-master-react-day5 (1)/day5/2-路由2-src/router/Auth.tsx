import { Navigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

const Auth: React.FC<Props> = (props) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return props.children
}

export default Auth