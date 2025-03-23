import './App.css'
import { useContext } from 'react'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import About from "./pages/About"
import PrivateRoutes from './privateRoutes/PrivateRoutes'
import Analytics from "./pages/Analytics"
import Dashboard from './pages/Dashboard'
import ExpenseCalculator from "./pages/ExpenseCalculator"
import History from "./pages/History"
import { UserContext } from './context/ContextApi'
import Profile from './pages/Profile'
import Home1 from './pages/Home1'


function App() {
  const { loggedIn } = useContext(UserContext);

  return (
    <>
      <Navbar />
  
      <Routes>
        <Route path='' element={<Navigate to={loggedIn ? "/home" : "/home1"} />} />
        
        <Route path='/home' element={loggedIn ? <Home /> : <Navigate to="/home1" />} />
        <Route path='/home1' element={!loggedIn ? <Home1 /> : <Navigate to="/home" />} />
        
        <Route path='/expenseCalculator' element={<ExpenseCalculator />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/history' element={<History />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/profile' element={<Profile />} />
        
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={loggedIn ? <Navigate to="/home" /> : <Register />} />
        <Route path='/about' element={<About />} />
      </Routes>
  
      <Footer />
    </>
  );
}

export default App
