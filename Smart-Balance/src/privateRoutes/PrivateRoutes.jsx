import  { useContext } from 'react'
import  { UserContext } from '../context/ContextApi'
import  { Navigate,Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const { loggedIn } = useContext(UserContext)
  console.log(loggedIn)
  if (loggedIn) {
    return <Outlet/>
  } else {
    return <Navigate to="/login" />
  }
}

export default PrivateRoutes
