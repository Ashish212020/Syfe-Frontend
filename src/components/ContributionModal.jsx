import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function ContributionModal({ isOpen, onClose, onConfirm }) {
  const [amount, setAmount] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    onConfirm(amount);
    setAmount(''); // Reset form
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
         <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Add Savings</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount Saved</label>
            <input 
              autoFocus
              required
              type="number" 
              min="1"
              placeholder="5000"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 mt-2">
            Confirm Contribution
          </button>
        </form>
      </div>
    </div>
  );
}