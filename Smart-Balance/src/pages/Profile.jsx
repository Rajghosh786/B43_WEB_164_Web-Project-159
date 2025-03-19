import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Github, Twitter, Dribbble, Pen } from 'lucide-react';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const [usersData, setUsersData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyA1oeYvrfHOpgn8lzkoQzqfDbDZoQRhh8o",
    authDomain: "expense-manager-users-data.firebaseapp.com",
    projectId: "expense-manager-users-data",
    storageBucket: "expense-manager-users-data.firebasestorage.app",
    messagingSenderId: "62774823419",
    appId: "1:62774823419:web:0a22df6915a4178f38635e",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const fetchUserData = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setUsersData(docSnap.data());
      } else {
        console.log("No such user!");
      }
    } catch (error) {
      console.error("Error getting user data: ", error);
    }
  };

  useEffect(() => {
    const parsedUserDetails = JSON.parse(localStorage.getItem("userdetails"));   
      fetchUserData(parsedUserDetails.uid);
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex justify-center items-center min-h-screen to-teal-400 profile">
      <div className="flex flex-col sm:flex-row bg-white rounded-3xl shadow-2xl max-w-6xl w-full p-8 gap-8">
        <div className="flex flex-col items-center sm:items-start gap-8 sm:w-1/3">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-teal-600">
              {`${usersData.firstName} ${usersData.lastName}`}
            </h1>
            <div className="flex gap-4">
              <Link>
                <Linkedin className="text-teal-600 hover:text-teal-800 transition-colors" />
              </Link>
              <Link>
                <Github className="text-teal-600 hover:text-teal-800 transition-colors" />
              </Link>
              <Link>
                <Facebook className="text-teal-600 hover:text-teal-800 transition-colors" />
              </Link>
              <Link>
                <Twitter className="text-teal-600 hover:text-teal-800 transition-colors" />
              </Link>
              <Link>
                <Dribbble className="text-teal-600 hover:text-teal-800 transition-colors" />
              </Link>
            </div>
          </div>

          <img
            src="https://www.usnews.com/object/image/0000017f-2352-df1a-a3ff-b77bab9e0000/gettyimages-1369617365.jpg?update-time=1645565687144&size=responsive640"
            alt="Profile"
            className="rounded-full w-40 h-40 object-cover border-4 border-teal-200 mt-4 transform transition-all duration-300 hover:scale-105"
          />
        </div>

        <div className="sm:w-2/3 flex flex-col gap-8">
          <button
            onClick={handleEditToggle}
            className="self-end px-6 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition duration-300"
          >
            <Pen />
          </button>

          <div className="space-y-4">
            <h1 className="text-2xl font-medium text-teal-600">Personal Details</h1>

            <div className="flex justify-between items-center space-y-1">
              <p className="text-gray-700 font-semibold w-1/3">FirstName:</p>
              <p className="text-gray-700 w-2/3">
                {usersData.firstName}
              </p>
            </div>

            <div className="flex justify-between items-center space-y-1">
              <p className="text-gray-700 font-semibold w-1/3">LastName:</p>
              <p className="text-gray-700 w-2/3">
                {usersData.lastName}
              </p>
            </div>

            <div className="flex justify-between items-center space-y-1">
              <p className="text-gray-700 font-semibold w-1/3">Email:</p>
              <p className="text-gray-700 w-2/3">
                {usersData.email}
              </p>
            </div>

            <div className="flex justify-between items-center space-y-1">
              <p className="text-gray-700 font-semibold w-1/3">Birthday:</p>
              <p className="text-gray-700 w-2/3">
                {usersData.dob ? usersData.dob.substring(0, 10) : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
