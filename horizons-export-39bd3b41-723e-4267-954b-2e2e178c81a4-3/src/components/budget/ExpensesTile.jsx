
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";

const ExpensesTile = ({ expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Expenses</h3>
        <ScrollArea className="h-[200px] w-full">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex justify-between items-center py-2 border-b border-gray-100"
            >
              <div>
                <p className="text-sm font-medium text-gray-700">{expense.description}</p>
                <p className="text-xs text-gray-500">{expense.category}</p>
              </div>
              <p className="text-sm font-semibold text-red-600">
                -{formatCurrency(expense.amount)}
              </p>
            </div>
          ))}
        </ScrollArea>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-600">Total Expenses</p>
            <p className="text-lg font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ExpensesTile;
