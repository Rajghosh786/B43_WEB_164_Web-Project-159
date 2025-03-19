import { useState,useContext, useEffect } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from '../context/ContextApi';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {loggedIn,setLoggedIn} = useContext(UserContext)

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
  
    function login(e){
      e.preventDefault()
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        setLoggedIn(true)
        console.log(loggedIn)
        localStorage.setItem("userdetails",JSON.stringify(user))
      })
      .catch((error) => {
        setLoggedIn(false,"error")
        console.log(error.code)
        console.log(error.message)
      });
    }

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("userdetails"))
      console.log(data)
      if(data){
        setLoggedIn(true)
      }
    }, [])

    if(loggedIn){
      return <Navigate to="/home"/>
    }
    return (
      <div className="max-w-lg mx-auto mt-8 p-6 border rounded-lg shadow-lg bg-white">
        <form onSubmit={login}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
            <input onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" required className="w-full p-3 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold">Password:</label>
            <input onChange={(e)=>setPassword(e.target.value)} type="password" id="password" name="password" required className="w-full p-3 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"/>
          </div>

          <div className="mt-6">
            <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600">Login</button>
          </div>
        </form>
      </div>
    )
}

export default Login
