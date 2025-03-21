import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, LineController, BarController } from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend, 
  LineController, 
  BarController
);

const Analytics = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

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

      setFilteredExpenses(filteredExpenses);
      setFilteredIncomes(filteredIncomes);
      setLoading(false);
    }
  }, [expenses, incomes, startDate, endDate]);

  const getMonthlyData = (data) => {
    const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'short' }));
    const monthlyData = new Array(12).fill(0);

    data.forEach(item => {
      const month = new Date(item.date.split('/').reverse().join('-')).getMonth();
      monthlyData[month] += item.amount;
    });

    return { months, data: monthlyData };
  };

  const expenseChartData = getMonthlyData(filteredExpenses);
  const incomeChartData = getMonthlyData(filteredIncomes);

  const expenseVsIncomeChartData = {
    labels: expenseChartData.months,
    datasets: [
      {
        label: 'Expenses',
        data: expenseChartData.data,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Income',
        data: incomeChartData.data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }
    ],
  };

  const expenseCategoryData = filteredExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const expenseCategoryChartData = {
    labels: Object.keys(expenseCategoryData),
    datasets: [
      {
        label: 'Spending by Category',
        data: Object.values(expenseCategoryData),
        backgroundColor: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0', '#ffb3e6'],
      }
    ],
  };

  const incomeCategoryData = filteredIncomes.reduce((acc, income) => {
    acc[income.category] = (acc[income.category] || 0) + income.amount;
    return acc;
  }, {});

  const incomeCategoryChartData = {
    labels: Object.keys(incomeCategoryData),
    datasets: [
      {
        label: 'Income by Category',
        data: Object.values(incomeCategoryData),
        backgroundColor: ['#99ff99', '#ffcc99', '#ff9999', '#66b3ff', '#c2c2f0', '#ffb3e6'],
      }
    ],
  };

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-indigo-100 to-gray-200 min-h-screen">
      {loading ? (
        <div className="text-lg text-gray-600">Loading...</div>
      ) : (
        <div className="w-full max-w-4xl bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Analytics</h2>

          <div className="flex gap-6 mb-8">
            <div className="flex-1 p-6 border border-gray-200 rounded-xl shadow-lg bg-white">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Date</h3>
              <div className="flex gap-6">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div className="p-6 border border-gray-200 rounded-xl shadow-lg bg-white">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Expense vs. Income (Monthly)</h3>
              <Line data={expenseVsIncomeChartData} />
            </div>
            <div className="p-6 border border-gray-200 rounded-xl shadow-lg bg-white">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Expense Breakdown by Category</h3>
              <Bar data={expenseCategoryChartData} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div className="p-6 border border-gray-200 rounded-xl shadow-lg bg-white">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Income Breakdown by Category</h3>
              <Bar data={incomeCategoryChartData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
