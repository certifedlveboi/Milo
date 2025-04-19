
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const SubscriptionsTile = ({ subscriptions, onAddSubscription }) => {
  const totalSubscriptions = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Subscriptions</h3>
          <Button
            onClick={onAddSubscription}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
        <ScrollArea className="h-[200px] w-full">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="flex justify-between items-center py-2 border-b border-gray-100"
            >
              <div>
                <p className="text-sm font-medium text-gray-700">{subscription.name}</p>
                <p className="text-xs text-gray-500">
                  Renews {subscription.recurring_period}
                </p>
              </div>
              <p className="text-sm font-semibold text-blue-600">
                {formatCurrency(subscription.amount)}
              </p>
            </div>
          ))}
        </ScrollArea>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-600">Total Subscriptions</p>
            <p className="text-lg font-bold text-blue-600">
              {formatCurrency(totalSubscriptions)}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SubscriptionsTile;
