import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filteredIncomes, setFilteredIncomes] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setExpenses(userData.expenses);
      setIncomes(userData.incomes);
    }
  }, []);

  useEffect(() => {
    if (expenses.length > 0 || incomes.length > 0) {  
      const filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date.split('/').reverse().join('-'));
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        
        return (
          (!start || expenseDate >= start) && (!end || expenseDate <= end)
        );
      });

      const filteredIncomes = incomes.filter((income) => {
        const incomeDate = new Date(income.date.split('/').reverse().join('-'));
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        
        return (
          (!start || incomeDate >= start) && (!end || incomeDate <= end)
        );
      });

      if (filteredExpenses.length === 0) {
        setExpenseCategories([]);
        setExpenseData([]);
      } else {
        const expenseCategoryData = {};
        filteredExpenses.forEach((expense) => {
          if (expenseCategoryData[expense.category]) {
            expenseCategoryData[expense.category] += expense.amount;
          } else {
            expenseCategoryData[expense.category] = expense.amount;
          }
        });
        setExpenseCategories(Object.keys(expenseCategoryData));
        setExpenseData(Object.values(expenseCategoryData));
      }

      if (filteredIncomes.length === 0) {
        setIncomeCategories([]);
        setIncomeData([]);
      } else {
        const incomeCategoryData = {};
        filteredIncomes.forEach((income) => {
          if (incomeCategoryData[income.category]) {
            incomeCategoryData[income.category] += income.amount;
          } else {
            incomeCategoryData[income.category] = income.amount;
          }
        });
        setIncomeCategories(Object.keys(incomeCategoryData));
        setIncomeData(Object.values(incomeCategoryData));
      }

      setFilteredExpenses(filteredExpenses);
      setFilteredIncomes(filteredIncomes);
      setLoading(false);
    }
  }, [expenses, incomes, startDate, endDate]);

  const expenseChartData = {
    labels: expenseCategories,
    datasets: [
      {
        data: expenseData,
        backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0', '#ffb3e6'],
        hoverBackgroundColor: ['#ff6666', '#3399ff', '#66ff66', '#ff9966', '#b3b3e6', '#ff80b3'],
      },
    ],
  };

  const incomeChartData = {
    labels: incomeCategories,
    datasets: [
      {
        data: incomeData,
        backgroundColor: ['#99ff99', '#ffcc99', '#ff9999', '#66b3ff', '#c2c2f0', '#ffb3e6'],
        hoverBackgroundColor: ['#66ff66', '#ff9966', '#ff6666', '#3399ff', '#b3b3e6', '#ff80b3'],
      },
    ],
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-indigo-100 to-gray-200 min-h-screen">
      {loading ? (
        <div className="text-lg text-gray-600">Loading...</div>
      ) : (
        <div className="w-full max-w-5xl bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">Expense & Income Dashboard</h2>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            <div className="p-6 border border-gray-200 rounded-xl shadow-lg bg-gradient-to-r from-red-50 to-red-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Expenses</h3>
              <p className="text-3xl font-bold text-red-600">
                ${expenseData.reduce((a, b) => a + b, 0).toFixed(2)}
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-xl shadow-lg bg-gradient-to-r from-green-50 to-green-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Income</h3>
              <p className="text-3xl font-bold text-green-600">
                ${incomeData.reduce((a, b) => a + b, 0).toFixed(2)}
              </p>
            </div>
          </div>
  
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="flex-1 p-6 border border-gray-200 rounded-xl shadow-lg bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Date</h3>
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="text-sm font-medium text-gray-700">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>
            </div>
          </div>
  
          {filteredExpenses.length === 0 && filteredIncomes.length === 0 ? (
            <div className="mt-6 text-center text-gray-600">No data found for this date range.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
                <div className="p-6 border border-gray-200 rounded-xl shadow-lg bg-white">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Expense Breakdown</h3>
                  <Pie data={expenseChartData} />
                </div>
                <div className="p-6 border border-gray-200 rounded-xl shadow-lg bg-white">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Income Breakdown</h3>
                  <Pie data={incomeChartData} />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
  
};

export default Dashboard;
