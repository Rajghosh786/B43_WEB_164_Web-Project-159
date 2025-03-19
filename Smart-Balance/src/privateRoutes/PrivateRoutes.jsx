import React, { useContext } from 'react'
import { UserContext } from '../context/ContextApi'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({ children }) => {
  const { loggedIn } = useContext(UserContext)
  console.log(loggedIn)
  if (loggedIn) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}

export default PrivateRoutes
