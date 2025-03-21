import React, { useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/ContextApi';
import '../styles/Navbar.css';
import { Home, BarChart, Clock, PieChart, LogOut, User } from 'lucide-react';
// import logo from '../images/ss.webp';
const Navbar = () => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(localStorage.getItem('userdetails') ? true : false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userdetails');
    localStorage.removeItem('userData');
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="bg-indigo-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <div className="text-white text-xl font-semibold">
          Smart Balance
        </div>
        {/* <img src={logo} alt="Logo" className="w-24 h-24 object-contain" /> */}

        <div className="flex space-x-6 mx-auto">
          <NavLink to="/home" className="text-white hover:text-indigo-300 transition duration-300 flex items-center">
            <Home className="w-5 h-5 mr-2" />
            Home
          </NavLink>
  
          {loggedIn && (
            <>
              <NavLink to="/expenseCalculator" className="text-white hover:text-indigo-300 transition duration-300 flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Expense Calculator
              </NavLink>
              <NavLink to="/dashboard" className="text-white hover:text-indigo-300 transition duration-300 flex items-center">
                <BarChart className="w-5 h-5 mr-2" />
                Dashboard
              </NavLink>
              <NavLink to="/history" className="text-white hover:text-indigo-300 transition duration-300 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                History
              </NavLink>
              <NavLink to="/analytics" className="text-white hover:text-indigo-300 transition duration-300 flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Analytics
              </NavLink>
            </>
          )}
        </div>
  

        <div className="flex space-x-4">
          {loggedIn ? (
            <>

              <NavLink to="/profile" className="text-white hover:text-indigo-300 transition duration-300 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile
              </NavLink>
  

              <button onClick={handleLogout} className="text-white hover:text-indigo-300 transition duration-300 flex items-center">
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-white hover:text-indigo-300 transition duration-300">
                Login
              </NavLink>
              <NavLink to="/register" className="text-white hover:text-indigo-300 transition duration-300">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
