import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function GoalModal({ isOpen, onClose, onCreate }) {
  const [newGoal, setNewGoal] = useState({ name: '', target: '', currency: 'INR' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newGoal.name || !newGoal.target) return;
    onCreate(newGoal);
    setNewGoal({ name: '', target: '', currency: 'INR' }); // Reset form
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Create New Goal</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goal Name</label>
            <input 
              autoFocus
              required
              type="text" 
              placeholder="e.g. Trip to Japan"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={newGoal.name}
              onChange={e => setNewGoal({...newGoal, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount</label>
              <input 
                required
                type="number" 
                min="1"
                placeholder="10000"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={newGoal.target}
                onChange={e => setNewGoal({...newGoal, target: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select 
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={newGoal.currency}
                onChange={e => setNewGoal({...newGoal, currency: e.target.value})}
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mt-2">
            Create Goal
          </button>
        </form>
      </div>
    </div>
  );
}