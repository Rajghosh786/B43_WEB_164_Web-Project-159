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
        <div className="text-white text-xl font-semibold">Expense Manager</div>
        <div className="space-x-6">
          <NavLink to="/home" className="text-white hover:text-indigo-300 transition duration-300">
            Home
          </NavLink>
          <NavLink to="/about" className="text-white hover:text-indigo-300 transition duration-300">
            About Us
          </NavLink>

          {loggedIn ? (
            <button onClick={handleLogout} className="text-white hover:text-indigo-300 transition duration-300">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="text-white hover:text-indigo-300 transition duration-300">
              Login
            </NavLink>
          )}

          <NavLink to="/register" className="text-white hover:text-indigo-300 transition duration-300">
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
