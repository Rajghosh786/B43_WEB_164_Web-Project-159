import React, { useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/ContextApi';
import '../styles/Navbar.css';

const Navbar = () => {
  const { loggedIn, setLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(localStorage.getItem('userdetails') ? true : false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userdetails');
    setLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="bg-indigo-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-semibold">Smart Balance</div>
        <div className="space-x-6">
          <NavLink to="/home" className="text-white hover:text-indigo-300 transition duration-300">
            Home
          </NavLink>
          <NavLink to="/about" className="text-white hover:text-indigo-300 transition duration-300">
            About Us
          </NavLink>

          {loggedIn
          ?(<NavLink to="/expenseCalculator" className="text-white hover:text-indigo-300 transition duration-300">
            Expense Calculator
          </NavLink>)
          :null
          }

          {loggedIn
          ?(<NavLink to="/dashboard" className="text-white hover:text-indigo-300 transition duration-300">
            Dashboard
          </NavLink>)
          :null
          }

          {loggedIn
          ?(<NavLink to="/history" className="text-white hover:text-indigo-300 transition duration-300">
            History
          </NavLink>)
          :null
          }

          {loggedIn
          ?(<NavLink to="/analytics" className="text-white hover:text-indigo-300 transition duration-300">
            Analytics
          </NavLink>)
          :null
          }

          {loggedIn ? (
            <button onClick={handleLogout} className="text-white hover:text-indigo-300 transition duration-300">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="text-white hover:text-indigo-300 transition duration-300">
              Login
            </NavLink>
          )}

          {loggedIn ? (
            <NavLink to="/profile" className="text-white hover:text-indigo-300 transition duration-300">
              Profile
            </NavLink>
          ) : (
            <NavLink to="/register" className="text-white hover:text-indigo-300 transition duration-300">
              Register
            </NavLink>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
