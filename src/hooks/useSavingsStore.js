import { useState, useEffect } from 'react';

export const useSavingsStore = () => {
  // 1. LAZY INITIALIZATION (Fixes the refresh bug)
  // We check LocalStorage directly when the app starts, before the first render.
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('syfe-goals');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load goals", e);
      return [];
    }
  });

  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2. Save to LocalStorage whenever goals change
  useEffect(() => {
    localStorage.setItem('syfe-goals', JSON.stringify(goals));
  }, [goals]);

  // 3. Fetch Exchange Rates
  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      setRates({
        INR: data.rates.INR,
        USD: 1,
        lastUpdated: new Date().toLocaleTimeString(),
      });
    } catch (err) {
      console.error(err);
      setRates({ INR: 84.5, USD: 1, lastUpdated: 'Offline Mode' });
    } finally {
      setLoading(false);
    }
  };

  const addGoal = (goal) => {
    setGoals(prev => [...prev, goal]);
  };

  const addContribution = (goalId, contribution) => {
    setGoals(prev => prev.map(g => {
      if (g.id === goalId) {
        return { ...g, contributions: [...g.contributions, contribution] };
      }
      return g;
    }));
  };

  return { goals, rates, loading, fetchRates, addGoal, addContribution };
};