import React, { useState, useEffect } from 'react';

const History = () => {
  const [userData, setUserData] = useState(null);
  const [expenseSortBy, setExpenseSortBy] = useState('amount');
  const [expenseSortOrder, setExpenseSortOrder] = useState('asc');
  const [incomeSortBy, setIncomeSortBy] = useState('amount');
  const [incomeSortOrder, setIncomeSortOrder] = useState('asc');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data) {
      setUserData(data);
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const sortData = (data, sortBy, sortOrder) => {
    return [...data].sort((a, b) => {
      const aValue = sortBy === 'amount' ? a.amount : a.category;
      const bValue = sortBy === 'amount' ? b.amount : b.category;

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  };

  const sortedExpenses = sortData(userData.expenses, expenseSortBy, expenseSortOrder);
  const sortedIncomes = sortData(userData.incomes, incomeSortBy, incomeSortOrder);

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-indigo-100 to-gray-200 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">History</h2>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">User Information</h3>
          <div className="text-lg text-gray-700 mb-4">
            <p><strong>Budget:</strong> ${userData.incomes.reduce((total, income) => total + income.amount, 0).toFixed(2)}</p>
            <p><strong>Remaining Budget:</strong> ${userData.remaining}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Expenses</h3>
          <div className="flex space-x-4 mb-4">
            <select
              value={expenseSortBy}
              onChange={(e) => setExpenseSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="amount">Amount</option>
              <option value="category">Category</option>
            </select>
            <select
              value={expenseSortOrder}
              onChange={(e) => setExpenseSortOrder(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          {userData.expenses.length === 0 ? (
            <p className="text-center text-gray-600">No expense data available.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
                </tr>
              </thead>
              <tbody>
                {sortedExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{expense.des}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{expense.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">${expense.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{expense.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{expense.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Incomes</h3>
          <div className="flex space-x-4 mb-4">
            <select
              value={incomeSortBy}
              onChange={(e) => setIncomeSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="amount">Amount</option>
              <option value="category">Category</option>
            </select>
            <select
              value={incomeSortOrder}
              onChange={(e) => setIncomeSortOrder(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          {userData.incomes.length === 0 ? (
            <p className="text-center text-gray-600">No income data available.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
                </tr>
              </thead>
              <tbody>
                {sortedIncomes.map((income) => (
                  <tr key={income.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{income.des}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{income.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">${income.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{income.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{income.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
