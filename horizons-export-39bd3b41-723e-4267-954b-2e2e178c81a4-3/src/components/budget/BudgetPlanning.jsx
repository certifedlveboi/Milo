
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import NetWorthTile from "./NetWorthTile";
import ExpensesTile from "./ExpensesTile";
import SubscriptionsTile from "./SubscriptionsTile";
import BillsTile from "./BillsTile";
import SavingsGoalsTile from "./SavingsGoalsTile";
import AISuggestionsTile from "./AISuggestionsTile";
import { useToast } from "@/components/ui/use-toast";

const BudgetPlanning = () => {
  const [expenses, setExpenses] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [bills, setBills] = useState([]);
  const [goals, setGoals] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const fetchBudgetData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch expenses
        const { data: expensesData } = await supabase
          .from('bank_transactions')
          .select('*')
          .eq('user_id', user.id)
          .order('transaction_date', { ascending: false })
          .limit(10);

        if (expensesData) setExpenses(expensesData);

        // Fetch subscriptions
        const { data: subscriptionsData } = await supabase
          .from('budget_items')
          .select('*')
          .eq('user_id', user.id)
          .eq('type', 'subscription');

        if (subscriptionsData) setSubscriptions(subscriptionsData);

        // Fetch bills
        const { data: billsData } = await supabase
          .from('budget_items')
          .select('*')
          .eq('user_id', user.id)
          .eq('type', 'bill');

        if (billsData) setBills(billsData);

        // Fetch savings goals
        const { data: goalsData } = await supabase
          .from('savings_goals')
          .select('*')
          .eq('user_id', user.id);

        if (goalsData) setGoals(goalsData);
      }
    } catch (error) {
      console.error('Error fetching budget data:', error);
      toast({
        title: "Error",
        description: "Failed to load budget data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const calculateNetWorth = () => {
    const totalAssets = 0; // Implement asset calculation
    const totalLiabilities = bills.reduce((sum, bill) => sum + bill.amount, 0) +
      subscriptions.reduce((sum, sub) => sum + sub.amount, 0);
    return totalAssets - totalLiabilities;
  };

  const handleAddSubscription = () => {
    // Implement subscription addition
  };

  const handleAddBill = () => {
    // Implement bill addition
  };

  const handleAddGoal = () => {
    // Implement goal addition
  };

  const aiSuggestions = [
    "Consider reducing streaming subscriptions to save $30/month",
    "Setting up automatic payments for bills could help avoid late fees",
    "You're on track to reach your vacation savings goal by June",
    "Your grocery spending is 20% higher than last month"
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-3">
        <NetWorthTile netWorth={calculateNetWorth()} />
      </div>
      <ExpensesTile expenses={expenses} />
      <SubscriptionsTile
        subscriptions={subscriptions}
        onAddSubscription={handleAddSubscription}
      />
      <BillsTile
        bills={bills}
        onAddBill={handleAddBill}
      />
      <SavingsGoalsTile
        goals={goals}
        onAddGoal={handleAddGoal}
      />
      <div className="lg:col-span-2">
        <AISuggestionsTile suggestions={aiSuggestions} />
      </div>
    </div>
  );
};

export default BudgetPlanning;
