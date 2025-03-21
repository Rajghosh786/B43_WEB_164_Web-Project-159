import React, { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [dob, setDob] = useState("")

  const firebaseConfig = {
    apiKey: "AIzaSyA1oeYvrfHOpgn8lzkoQzqfDbDZoQRhh8o",
    authDomain: "expense-manager-users-data.firebaseapp.com",
    projectId: "expense-manager-users-data",
    storageBucket: "expense-manager-users-data.firebasestorage.app",
    messagingSenderId: "62774823419",
    appId: "1:62774823419:web:0a22df6915a4178f38635e"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  function register(e){
    e.preventDefault()

    if (password !== confirmPassword) {
      console.log("Passwords do not match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      setDoc(doc(db, 'users', user.uid),{
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        createdAt: new Date(),
        expenses:[],
        incomes:[],
        remaining:0,
        budget:0
      })    
    }).then(() => {
      console.log('User data added to Firestore');
      navigate("/login")
    }).catch((error) => {
      console.log(error.code)
      console.log(error.message)
    });
  }

  return (
    <div className="p-8 bg-gradient-to-r from-indigo-100 to-gray-200 min-h-screen">
    <div className="max-w-lg mx-auto m-10 p-8 border rounded-lg shadow-lg bg-white">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Create Your Account</h2>
      <form onSubmit={register} className="space-y-6">
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-semibold text-lg">Email:</label>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="w-full p-4 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 text-lg" 
            placeholder="Enter your email"
          />
        </div>
  
        <div className="mb-6">
          <label htmlFor="firstName" className="block text-gray-700 font-semibold text-lg">First Name:</label>
          <input 
            onChange={(e) => setFirstName(e.target.value)} 
            type="text" 
            id="firstName" 
            name="firstName" 
            required 
            className="w-full p-4 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 text-lg" 
            placeholder="Enter your first name"
          />
        </div>
  
        <div className="mb-6">
          <label htmlFor="lastName" className="block text-gray-700 font-semibold text-lg">Last Name:</label>
          <input 
            onChange={(e) => setLastName(e.target.value)} 
            type="text" 
            id="lastName" 
            name="lastName" 
            required 
            className="w-full p-4 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 text-lg" 
            placeholder="Enter your last name"
          />
        </div>
  
        <div className="mb-6">
          <label htmlFor="dob" className="block text-gray-700 font-semibold text-lg">Date of Birth:</label>
          <input 
            onChange={(e) => setDob(e.target.value)} 
            type="date" 
            id="dob" 
            name="dob" 
            required 
            className="w-full p-4 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 text-lg"
          />
        </div>
  
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-semibold text-lg">Password:</label>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            id="password" 
            name="password" 
            required 
            className="w-full p-4 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 text-lg" 
            placeholder="Enter your password"
          />
        </div>
  
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold text-lg">Confirm Password:</label>
          <input 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            required 
            className="w-full p-4 mt-2 border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 text-lg" 
            placeholder="Confirm your password"
          />
        </div>
  
        <div className="mt-8">
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white p-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-lg"
          >
            Register
          </button>
        </div>
      </form>
    </div>
    </div>
  );
  
}

export default Register
