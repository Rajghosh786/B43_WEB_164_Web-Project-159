import React from 'react'
import home from "../images/home.webp"
import { Calculator, BarChart2, Smartphone, Tag, Lock, Cloud } from "lucide-react";

function Home1() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-gray-200 flex flex-col justify-center items-center text-black p-6 sm:p-10">
      <div className="max-w-6xl flex flex-col sm:flex-row items-center justify-between w-full mb-16">
        <div className="max-w-lg mb-8 sm:mb-0">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight text-black">
            Privacy-First Money Management: Securely Track Expenses & Budgets
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Take control of your finances with a simple, secure, and private tool for tracking your spending.
          </p>
        </div>
        <div className="w-full sm:w-96">
          <img src={home} alt="Expense Manager App" className="w-full rounded-2xl shadow-2xl transform transition-transform hover:scale-105" />
        </div>
      </div>
  
      <div className="text-center mt-12 max-w-4xl px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-black">
          Your Data, Your Device - Unmatched Privacy in Expense Tracking
        </h1>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Join over 500,000 users who trust Expenses Manager for their daily expense tracking and budgeting.
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-black">
          Designed for Simplicity, Built for Security
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-8">
          Discover the suite of features that make Expenses Manager the ultimate tool for your money management.
        </p>
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16 max-w-6xl w-full px-4">
        <div className="flex flex-col items-center bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl transform transition-transform hover:scale-105">
          <Calculator size={40} className="text-green-400" />
          <h3 className="text-xl font-semibold mt-4 text-black">Budget Planner</h3>
          <p className="text-lg text-gray-400 mt-2 text-center">Set budgets for different categories and monitor your spending against them.</p>
        </div>
  
        <div className="flex flex-col items-center bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl transform transition-transform hover:scale-105">
          <BarChart2 size={40} className="text-yellow-400" />
          <h3 className="text-xl font-semibold mt-4 text-black">Insightful Analytics</h3>
          <p className="text-lg text-gray-400 mt-2 text-center">Visualize your spending. Gain insights with detailed analytics and predictions.</p>
        </div>
  
        <div className="flex flex-col items-center bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl transform transition-transform hover:scale-105">
          <Smartphone size={40} className="text-blue-400" />
          <h3 className="text-xl font-semibold mt-4 text-black">Account Management</h3>
          <p className="text-lg text-gray-400 mt-2 text-center">Efficiently manage all your accounts in one place. Add transactions and track balances.</p>
        </div>
  
        <div className="flex flex-col items-center bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl transform transition-transform hover:scale-105">
          <Tag size={40} className="text-purple-400" />
          <h3 className="text-xl font-semibold mt-4 text-black">Tags & Categories</h3>
          <p className="text-lg text-gray-400 mt-2 text-center">Personalize your tracking. Organize expenses with custom tags and categories.</p>
        </div>
  
        <div className="flex flex-col items-center bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl transform transition-transform hover:scale-105">
          <Lock size={40} className="text-red-400" />
          <h3 className="text-xl font-semibold mt-4 text-black">Secure & Private</h3>
          <p className="text-lg text-gray-400 mt-2 text-center">Your data stays on your device with industry-leading encryption.</p>
        </div>
  
        <div className="flex flex-col items-center bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl transform transition-transform hover:scale-105">
          <Cloud size={40} className="text-green-300" />
          <h3 className="text-xl font-semibold mt-4 text-black">Cloud Backup</h3>
          <p className="text-lg text-gray-400 mt-2 text-center">Sync and back up your expenses securely across multiple devices.</p>
        </div>
      </div>
    </div>
  );
  
  
}

export default Home1;
