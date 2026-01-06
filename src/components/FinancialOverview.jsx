import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function FinancialOverview({ goals, rates, onRefresh, isLoading }) {
  if (!rates) return <div className="p-6 bg-gray-200 rounded-xl animate-pulse h-48 mb-8"></div>;

  const totalTargetINR = goals.reduce((acc, goal) => {
    const rate = goal.currency === 'USD' ? rates.INR : 1;
    return acc + (goal.targetAmount * rate);
  }, 0);

  const totalSavedINR = goals.reduce((acc, goal) => {
    const saved = goal.contributions.reduce((sum, c) => sum + c.amount, 0);
    const rate = goal.currency === 'USD' ? rates.INR : 1;
    return acc + (saved * rate);
  }, 0);

  const progress = totalTargetINR > 0 ? (totalSavedINR / totalTargetINR) * 100 : 0;

  return (
    <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Financial Overview</h2>
        <button 
          onClick={onRefresh} 
          disabled={isLoading}
          className="flex items-center text-xs bg-blue-500 hover:bg-blue-400 px-3 py-1.5 rounded transition disabled:opacity-50"
        >
          <RefreshCw size={14} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Updating...' : 'Refresh Rates'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-blue-200 text-sm font-medium">Total Target</p>
          <p className="text-3xl font-bold">₹{totalTargetINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
        <div>
          <p className="text-blue-200 text-sm font-medium">Total Saved</p>
          <p className="text-3xl font-bold">₹{totalSavedINR.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
        </div>
        <div>
          <p className="text-blue-200 text-sm font-medium">Overall Progress</p>
          <p className="text-3xl font-bold">{progress.toFixed(1)}%</p>
          <div className="w-full bg-blue-800/50 h-2 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-green-400 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>
      </div>
      <p className="text-xs text-blue-300/80 mt-4 text-right">
        1 USD = {rates.INR.toFixed(2)} INR • Last updated: {rates.lastUpdated}
      </p>
    </div>
  );
}