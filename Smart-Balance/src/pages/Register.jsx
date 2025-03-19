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
    <div className="max-w-lg mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white">
      <form onSubmit={register}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
          <input onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" required className="w-full p-3 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
        </div>

        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-semibold">First Name:</label>
          <input onChange={(e)=>setFirstName(e.target.value)} type="text" id="firstName" name="firstName" required className="w-full p-3 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-semibold">Last Name:</label>
          <input onChange={(e)=>setLastName(e.target.value)} type="text" id="lastName" name="lastName" required className="w-full p-3 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
        </div>

        <div className="mb-4">
          <label htmlFor="dob" className="block text-gray-700 font-semibold">Date of Birth:</label>
          <input onChange={(e)=>setDob(e.target.value)} type="date" id="dob" name="dob" required className="w-full p-3 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-semibold">Password:</label>
          <input onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name="password" required className="w-full p-3 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">Confirm Password:</label>
          <input onChange={(e)=>setConfirmPassword(e.target.value)} type="password" id="confirmPassword" name="confirmPassword" required className="w-full p-3 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
        </div>

        <div className="mt-6">
          <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600">Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register
