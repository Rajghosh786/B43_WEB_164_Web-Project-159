import { useState,useContext, useEffect } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from '../context/ContextApi';
import { Navigate } from 'react-router-dom';
import { getFirestore,doc,getDoc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

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
    const db = getFirestore(app)
  
    const login = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              const user = userCredential.user;
              console.log(user);
              setLoggedIn(true);
              localStorage.setItem("userdetails", JSON.stringify(user));
              fetchUserData(user.uid);
          })
          .catch((error) => {
              console.log(error.code, error.message);
              setLoggedIn(false);
          });
  };

  const fetchUserData = async (uid) => {
    try {
        const userDocRef = doc(db, "users", uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
            console.log(docSnap.data());
            localStorage.setItem("userData", JSON.stringify(docSnap.data()));
        } else {
            console.log("No such user!");
        }
    } catch (error) {
        console.error("Error getting user data: ", error);
    }
};

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("userdetails"))   
      if(data){
        fetchUserData(data.uid)
        setLoggedIn(true)
      }
    }, [])

    if(loggedIn){
      return <Navigate to="/home"/>
    }
    return (
      <div className="flex flex-col items-center p-8 bg-gradient-to-r from-indigo-100 to-gray-200 min-h-screen">
      <div className="max-w-lg mx-auto m-10 p-8 border rounded-lg shadow-lg bg-white ">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Welcome Back! Please Log In</h2>
    
        <form onSubmit={login} className="space-y-6">
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
    
          <div className="mt-8">
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white p-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-lg"
            >
              Login
            </button>
          </div>
    
          <div className="text-center text-sm mt-4 text-gray-600">
            <p>Forgot your password? <a href="#" className="text-indigo-600 hover:underline">Reset it here</a></p>
          </div>
    
          {/* Social Media Login Buttons - Each on a separate row */}
          <div className="mt-6 space-y-4">
            <button 
              className="w-full flex items-center justify-center bg-red-600 text-white p-3 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
              aria-label="Sign in with Google"
            >
              <FontAwesomeIcon icon={faGoogle} className="mr-3 text-xl" />
              Google
            </button>
    
            <button 
              className="w-full flex items-center justify-center bg-blue-600 text-white p-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Sign in with Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} className="mr-3 text-xl" />
              Facebook
            </button>
    
            <button 
              className="w-full flex items-center justify-center bg-gray-800 text-white p-3 rounded-md shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800"
              aria-label="Sign in with GitHub"
            >
              <FontAwesomeIcon icon={faGithub} className="mr-3 text-xl" />
              GitHub
            </button>
          </div>
        </form>
      </div>
      </div>
    );
}

export default Login
