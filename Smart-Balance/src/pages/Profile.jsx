import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Github, Twitter, Dribbble, Pen } from "lucide-react";
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

  const icons = {
    Linkedin: Linkedin,
    Github: Github,
    Facebook: Facebook,
    Twitter: Twitter,
    Dribbble: Dribbble,
  };
  return (
    <div className="p-8 bg-gradient-to-r from-indigo-100 to-gray-200 min-h-screen">
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-6xl p-10 flex flex-col sm:flex-row gap-12 bg-gradient-to-r from-teal-100 to-blue-200 ">

        <div className="flex flex-col items-center sm:items-start sm:w-1/3">
          <div className="w-full flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-teal-700">{`${usersData.firstName} ${usersData.lastName}`}</h1>
            <button
              onClick={handleEditToggle}
              className="p-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition"
            >
              <Pen />
            </button>
          </div>
          <div className="relative mb-6">
            <img
              src="https://www.usnews.com/object/image/0000017f-2352-df1a-a3ff-b77bab9e0000/gettyimages-1369617365.jpg?update-time=1645565687144&size=responsive640"
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-teal-300 transform transition-all duration-300 hover:scale-110 shadow-xl"
            />
            <div className="absolute top-0 right-0 bg-teal-500 p-1 rounded-full">
              <Link to="#" className="text-white text-sm">Edit</Link>
            </div>
          </div>

          <div className="flex gap-6 mb-6">
            {["Linkedin", "Github", "Facebook", "Twitter", "Dribbble"].map((icon, idx) => (
              <Link key={idx} className="text-teal-600 hover:text-teal-800 transition-colors transform hover:scale-125">
                {React.createElement(icons[icon], { size: 28 })}
              </Link>
            ))}
          </div>
        </div>


        <div className="sm:w-2/3 flex flex-col gap-8">
          <h1 className="text-3xl font-semibold text-teal-700">Personal Details</h1>

          <div className="bg-teal-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            {/* <div className="flex justify-between items-center">
              <p className="text-teal-600 font-medium">Budget:</p>
              <p className="text-gray-800">${usersData.budget}</p>
            </div> */}
            <div className="flex justify-between items-center">
              <p className="text-teal-600 font-medium">Remaining:</p>
              <p className="text-gray-800">${usersData.remaining}</p>
            </div>
          </div>


          <div className="space-y-6">
            {[
              { label: "First Name", value: usersData.firstName },
              { label: "Last Name", value: usersData.lastName },
              { label: "Email", value: usersData.email },
              { label: "Birthday", value: usersData.dob ? usersData.dob.substring(0, 10) : "N/A" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-teal-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <p className="text-teal-600 font-medium">{item.label}:</p>
                  <p className="text-gray-800">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};




export default Profile;
