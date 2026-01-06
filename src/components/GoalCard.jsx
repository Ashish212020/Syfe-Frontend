import React from 'react';
import { Plus, TrendingUp } from 'lucide-react';

export default function GoalCard({ goal, rates, onAddContribution }) {
  const totalSaved = goal.contributions.reduce((sum, c) => sum + c.amount, 0);
  const progress = (totalSaved / goal.targetAmount) * 100;
  const remaining = Math.max(0, goal.targetAmount - totalSaved);
  
  const symbol = goal.currency === 'USD' ? '$' : '₹';
  
  const convertedTarget = goal.currency === 'USD' 
    ? `₹ ${(goal.targetAmount * rates.INR).toLocaleString('en-IN')}`
    : `$ ${(goal.targetAmount / rates.INR).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-5">
        <div className="flex gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600 h-fit">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{goal.name}</h3>
            <p className="text-gray-500 text-sm font-medium">
              Target: {symbol}{goal.targetAmount.toLocaleString()}
            </p>
          </div>
        </div>
        <span className="text-xs font-mono bg-gray-50 px-2 py-1 rounded border border-gray-100 text-gray-500">
          {convertedTarget}
        </span>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500 font-medium">Progress</span>
          <span className="font-bold text-gray-800">{symbol}{totalSaved.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${progress >= 100 ? 'bg-green-500' : 'bg-blue-600'}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>{goal.contributions.length} contributions</span>
            <span>{symbol}{remaining.toLocaleString()} to go</span>
        </div>
      </div>

      <button 
        onClick={() => onAddContribution(goal.id)}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 border-dashed border-gray-200 text-gray-500 font-semibold hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all text-sm"
      >
        <Plus size={16} /> Add Contribution
      </button>
    </div>
  );
}