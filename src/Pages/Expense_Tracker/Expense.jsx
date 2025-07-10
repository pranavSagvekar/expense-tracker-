import React, { useState } from 'react';
import { useTransection } from '../../hooks/useTransection';
import { useGetTransection } from '../../hooks/useGetTransections';
import { useGetuserInfo } from '../../hooks/useGetuserInfo';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';

import {
  FaMoneyBillWave,
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaSignOutAlt,
  FaPlus,
} from 'react-icons/fa';
import { AiOutlineTransaction } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';

function Expense() {
  const { addTransection } = useTransection();
  const { transections, transectionTotal } = useGetTransection();
  const { name, profilePhoto } = useGetuserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [transectionAmount, setTransectionAmount] = useState(0);
  const [transectionType, setTransectionType] = useState('expense');

  const { balance, income, expense } = transectionTotal;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransection({
      description,
      transectionAmount: Number(transectionAmount),
      transectionType,
    });
    setDescription('');
    setTransectionAmount(0);
    setTransectionType('expense');
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error('Error appeared: ', err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://pngtree.com/freebackground/money-and-coins-calculator-tracking-income-and-expenses-with-3d-rendering_5814080.html')" }}
    >
      <div className="max-w-3xl mx-auto bg-white/30 backdrop-blur-md border border-white/40 shadow-lg rounded-xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <BiUserCircle className="text-indigo-600 text-2xl" />
            <span className="underline">{name}</span>'s Expense Tracker
          </h1>
          {profilePhoto && (
            <div className="flex items-center space-x-4">
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
              <button
                onClick={signUserOut}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
              >
                <FaSignOutAlt />
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Balance */}
        <div className="bg-white/50 backdrop-blur-sm rounded-md p-4 flex items-center gap-3 shadow-sm">
          <FaMoneyBillWave className="text-2xl text-indigo-500" />
          <div>
            <h3 className="text-gray-700 font-semibold">Your Balance:</h3>
            <h2
              className={`text-2xl font-bold ${
                balance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              ₹{Math.abs(balance)}
            </h2>
          </div>
        </div>

        {/* Income & Expense Summary */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg flex flex-col items-center shadow">
            <FaArrowCircleUp className="text-3xl text-green-700 mb-2" />
            <h4 className="text-lg font-semibold text-green-800">Income</h4>
            <p className="text-green-700 font-bold">₹{income}</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg flex flex-col items-center shadow">
            <FaArrowCircleDown className="text-3xl text-red-700 mb-2" />
            <h4 className="text-lg font-semibold text-red-800">Expenses</h4>
            <p className="text-red-700 font-bold">₹{expense}</p>
          </div>
        </div>

        {/* Transaction Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="number"
            placeholder="Amount"
            required
            value={transectionAmount}
            onChange={(e) => setTransectionAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 bg-white/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                value="expense"
                checked={transectionType === 'expense'}
                onChange={(e) => setTransectionType(e.target.value)}
              />
              <span>Expense</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                value="income"
                checked={transectionType === 'income'}
                onChange={(e) => setTransectionType(e.target.value)}
              />
              <span>Income</span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold"
          >
            <FaPlus />
            Add Transaction
          </button>
        </form>

        {/* Transaction Table */}
        <div className="pt-6">
          <h3 className="text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
            <AiOutlineTransaction className="text-xl text-indigo-500" />
            Transactions
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg bg-white/50 backdrop-blur-md">
              <thead className="bg-gray-100/80">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">#</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    <FaMoneyBillWave className="inline mr-1" />
                    Description
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    <FaPlus className="inline mr-1" />
                    Amount
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    <FaArrowCircleUp className="inline mr-1" />
                    Type
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...transections]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((transection, index) => {
                    const {
                      description,
                      transectionAmount,
                      transectionType,
                      createdAt,
                    } = transection;
                    const formattedDate = createdAt
                      ? new Date(createdAt).toLocaleString()
                      : 'N/A';
                    return (
                      <tr key={index} className="hover:bg-gray-50/60">
                        <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                        <td className="px-4 py-2 text-sm text-gray-800">{description}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">₹{transectionAmount}</td>
                        <td
                          className={`px-4 py-2 text-sm font-medium flex items-center gap-1 ${
                            transectionType === 'expense'
                              ? 'text-red-500'
                              : 'text-green-500'
                          }`}
                        >
                          {transectionType === 'expense' ? (
                            <FaArrowCircleDown />
                          ) : (
                            <FaArrowCircleUp />
                          )}
                          {transectionType}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500">{formattedDate}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expense;
