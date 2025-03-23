import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1oeYvrfHOpgn8lzkoQzqfDbDZoQRhh8o",
  authDomain: "expense-manager-users-data.firebaseapp.com",
  projectId: "expense-manager-users-data",
  storageBucket: "expense-manager-users-data.firebasestorage.app",
  messagingSenderId: "62774823419",
  appId: "1:62774823419:web:0a22df6915a4178f38635e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ExpenseCalculator = () => {
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);
  const [newExpense, setNewExpense] = useState({
    des: "",
    amount: "",
    category: "other",
  });
  const [newIncome, setNewIncome] = useState({
    des: "",
    amount: "",
    category: "salary",
  });
  const [expenseArray, setExpenseArray] = useState([]);
  const [incomeArray, setIncomeArray] = useState([]);

  const userId = auth.currentUser?.uid;

  const updateFirebase = async (userId, expenses, incomes, remaining) => {
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(
        userRef,
        {
          expenses: expenses,
          incomes: incomes,
          remaining: remaining,
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating Firebase: ", error);
    }
  };

  const handleExpenseInputChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleIncomeInputChange = (e) => {
    setNewIncome({ ...newIncome, [e.target.name]: e.target.value });
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (newExpense.des && newExpense.amount && !isNaN(newExpense.amount)) {
      const currentDate = new Date();
      const formattedDate = `${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}/${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${currentDate.getFullYear()}`;
      const formattedTime = `${currentDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${currentDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      const newExpenseItem = {
        id: crypto.randomUUID(),
        des: newExpense.des,
        category: newExpense.category,
        amount: Number(newExpense.amount),
        date: formattedDate,
        time: formattedTime,
      };

      setExpenseArray([...expenseArray, newExpenseItem]);
      setTotalExpense(totalExpense + Number(newExpense.amount));
      setTotalRemaining(totalIncome - totalExpense - Number(newExpense.amount));

      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      userData.expenses = [...expenseArray, newExpenseItem];
      userData.remaining =
        totalIncome - totalExpense - Number(newExpense.amount);
      localStorage.setItem("userData", JSON.stringify(userData));

      if (userId) {
        updateFirebase(
          userId,
          [...expenseArray, newExpenseItem],
          incomeArray,
          totalIncome - totalExpense - Number(newExpense.amount)
        );
      }

      setNewExpense({ des: "", amount: "", category: "other" });
    }
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    if (newIncome.des && newIncome.amount && !isNaN(newIncome.amount)) {
      const currentDate = new Date();
      const formattedDate = `${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")}/${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${currentDate.getFullYear()}`;
      const formattedTime = `${currentDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${currentDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      const newIncomeItem = {
        id: crypto.randomUUID(),
        des: newIncome.des,
        category: newIncome.category,
        amount: Number(newIncome.amount),
        date: formattedDate,
        time: formattedTime,
      };

      setIncomeArray([...incomeArray, newIncomeItem]);
      setTotalIncome(totalIncome + Number(newIncome.amount));
      setTotalRemaining(totalIncome - totalExpense);

      const userData = JSON.parse(localStorage.getItem("userData")) || {};
      userData.incomes = [...incomeArray, newIncomeItem];
      userData.remaining = totalIncome - totalExpense;
      localStorage.setItem("userData", JSON.stringify(userData));

      if (userId) {
        updateFirebase(
          userId,
          expenseArray,
          [...incomeArray, newIncomeItem],
          totalIncome - totalExpense
        );
      }

      setNewIncome({ des: "", amount: "", category: "salary" });
    }
  };

  const handleDeleteExpense = (id) => {
    const updatedArray = expenseArray.filter((e) => e.id !== id);
    setExpenseArray(updatedArray);

    let newTotalExpense = 0;
    updatedArray.forEach((expense) => {
      newTotalExpense += expense.amount;
    });

    setTotalExpense(newTotalExpense);
    setTotalRemaining(totalIncome - newTotalExpense);

    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    userData.expenses = updatedArray;
    userData.remaining = totalIncome - newTotalExpense;
    localStorage.setItem("userData", JSON.stringify(userData));

    if (userId) {
      updateFirebase(
        userId,
        updatedArray,
        incomeArray,
        totalIncome - newTotalExpense
      );
    }
  };

  const handleDeleteIncome = (id) => {
    const updatedArray = incomeArray.filter((i) => i.id !== id);
    setIncomeArray(updatedArray);

    let newTotalIncome = 0;
    updatedArray.forEach((income) => {
      newTotalIncome += income.amount;
    });

    setTotalIncome(newTotalIncome);
    setTotalRemaining(newTotalIncome - totalExpense);

    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    userData.incomes = updatedArray;
    userData.remaining = newTotalIncome - totalExpense;
    localStorage.setItem("userData", JSON.stringify(userData));

    if (userId) {
      updateFirebase(
        userId,
        expenseArray,
        updatedArray,
        newTotalIncome - totalExpense
      );
    }
  };

  useEffect(() => {
    const parsedUserData = JSON.parse(localStorage.getItem("userData"));
    if (parsedUserData) {
      setExpenseArray(parsedUserData.expenses || []);
      setIncomeArray(parsedUserData.incomes || []);
      setTotalRemaining(parsedUserData.remaining || 0);
      setTotalExpense(
        parsedUserData.expenses?.reduce(
          (acc, expense) => acc + expense.amount,
          0
        ) || 0
      );
      setTotalIncome(
        parsedUserData.incomes?.reduce(
          (acc, income) => acc + income.amount,
          0
        ) || 0
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-gray-200">
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Total Balance</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            <div className="bg-pink-100 p-6 rounded-lg shadow-lg">
              <p className="text-xs text-gray-600">Total Expenses</p>
              <h1 className="text-xl font-bold mt-2 text-gray-800">${totalExpense}</h1>
            </div>
            <div className="bg-orange-100 p-6 rounded-lg shadow-lg">
              <p className="text-xs text-gray-600">Total Income</p>
              <h1 className="text-xl font-bold mt-2 text-gray-800">${totalIncome}</h1>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-lg">
              <p className="text-xs text-gray-600">Remaining</p>
              <h1 className="text-xl font-bold mt-2 text-gray-800">${totalRemaining}</h1>
            </div>
          </div>
        </div>
  
        <div className="mt-12 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Income Section</h2>
            <form onSubmit={handleIncomeSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Enter income description"
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={newIncome.des}
                  onChange={handleIncomeInputChange}
                  name="des"
                />
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={newIncome.amount}
                  onChange={handleIncomeInputChange}
                  name="amount"
                />
                <select
                  onChange={handleIncomeInputChange}
                  name="category"
                  value={newIncome.category}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="salary">Salary</option>
                  <option value="freelance">Freelance</option>
                  <option value="investment">Investment</option>
                  <option value="other">Other</option>
                </select>
  
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Add Income
                </button>
              </div>
            </form>
          </div>
  
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Income List</h2>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="uppercase">
                {incomeArray.map((income) => (
                  <tr key={income.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {income.des}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {income.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {income.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {income.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {income.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleDeleteIncome(income.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Expense Section</h2>
            <form onSubmit={handleExpenseSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Enter description"
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={newExpense.des}
                  onChange={handleExpenseInputChange}
                  name="des"
                />
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  value={newExpense.amount}
                  onChange={handleExpenseInputChange}
                  name="amount"
                />
                <select
                  onChange={handleExpenseInputChange}
                  name="category"
                  value={newExpense.category}
                  className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="other">Other</option>
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="utilities">Utilities</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="health">Health</option>
                  <option value="rent">Rent</option>
                  <option value="shopping">Shopping</option>
                  <option value="education">Education</option>
                </select>
  
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
  
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Expense List</h2>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="uppercase">
                {expenseArray.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.des}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default ExpenseCalculator;
