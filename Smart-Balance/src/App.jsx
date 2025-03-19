import './App.css'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import About from "./pages/About"
import PrivateRoutes from './privateRoutes/PrivateRoutes'
function App() {

  return (
    <>
      <Navbar/>
        <Routes>
          <Route path='' element={<Navigate to="/home"/>}/>
          <Route path='/home' element={<PrivateRoutes><Home /></PrivateRoutes>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/about' element={<About/>}/>         
        </Routes>
      <Footer/>
    </>
  )
}

export default App
