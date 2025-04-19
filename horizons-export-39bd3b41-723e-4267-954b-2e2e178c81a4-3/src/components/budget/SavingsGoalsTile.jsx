
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";

const SavingsGoalsTile = ({ goals, onAddGoal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Savings Goals</h3>
          <Button
            onClick={onAddGoal}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
        <ScrollArea className="h-[200px] w-full">
          {goals.map((goal) => {
            const progress = (goal.current_amount / goal.target_amount) * 100;
            return (
              <div
                key={goal.id}
                className="py-3 border-b border-gray-100"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-700">{goal.name}</p>
                  <p className="text-sm font-semibold text-green-600">
                    {formatCurrency(goal.current_amount)} / {formatCurrency(goal.target_amount)}
                  </p>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            );
          })}
        </ScrollArea>
      </Card>
    </motion.div>
  );
};

export default SavingsGoalsTile;
