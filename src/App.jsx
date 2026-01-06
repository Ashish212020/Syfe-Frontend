import React, { useState } from 'react';
import { useSavingsStore } from './hooks/useSavingsStore';
import FinancialOverview from './components/FinancialOverview';
import GoalCard from './components/GoalCard';
import GoalModal from './components/GoalModal';
import ContributionModal from './components/ContributionModal';
import { Plus, TrendingUp } from 'lucide-react';

function App() {
  // 1. Get Logic from Hook
  const { goals, rates, loading, fetchRates, addGoal, addContribution } = useSavingsStore();
  
  // 2. UI State
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [activeGoalId, setActiveGoalId] = useState(null);

  // 3. Handlers
  const handleCreateGoal = (goalData) => {
    addGoal({
      id: crypto.randomUUID(),
      name: goalData.name,
      targetAmount: Number(goalData.target),
      currency: goalData.currency,
      contributions: []
    });
    setShowGoalModal(false);
  };

  const handleAddContribution = (amount) => {
    if (!activeGoalId) return;
    addContribution(activeGoalId, {
      id: crypto.randomUUID(),
      amount: Number(amount),
      date: new Date().toISOString()
    });
    setActiveGoalId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 mb-8">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
          <h1 className="text-xl font-bold tracking-tight">Syfe Savings Planner</h1>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Component 1: Financial Overview */}
        <FinancialOverview 
          goals={goals} 
          rates={rates} 
          onRefresh={fetchRates} 
          isLoading={loading}
        />

        {/* Goals Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Your Goals</h2>
          <button 
            onClick={() => setShowGoalModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-medium transition flex items-center gap-2"
          >
            <Plus size={18} /> New Goal
          </button>
        </div>

        {/* Empty State vs List State */}
        {goals.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-700">No goals yet</h3>
            <p className="text-gray-500 mb-6">Start tracking your dreams today.</p>
            <button onClick={() => setShowGoalModal(true)} className="text-blue-600 font-medium hover:underline">Create your first goal</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map(goal => (
              rates && <GoalCard 
                key={goal.id} 
                goal={goal} 
                rates={rates}
                onAddContribution={setActiveGoalId} 
              />
            ))}
          </div>
        )}
      </main>

      {/* Component 3 & 4: Modals */}
      <GoalModal 
        isOpen={showGoalModal} 
        onClose={() => setShowGoalModal(false)} 
        onCreate={handleCreateGoal} 
      />

      <ContributionModal 
        isOpen={!!activeGoalId} 
        onClose={() => setActiveGoalId(null)} 
        onConfirm={handleAddContribution} 
      />
    </div>
  );
}

export default App;