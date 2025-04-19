
import React from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import QuickAddReminder from "@/components/QuickAddReminder";
import { cn } from "@/lib/utils";

const RemindersList = ({ reminders, onAddReminder, onToggleReminder }) => {
  const sortedReminders = [...(reminders || [])].sort((a, b) => {
    const timeA = a.timestamp;
    const timeB = b.timestamp;
    return timeA.localeCompare(timeB);
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case "work":
        return "bg-blue-500";
      case "personal":
        return "bg-purple-500";
      case "fitness":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-blue-50 rounded-lg p-6 shadow-lg border-t-4 border-blue-400 min-h-[250px]">
      <h3 className="font-medium mb-4 text-blue-800">Reminders</h3>
      <QuickAddReminder onAddReminder={onAddReminder} />
      <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
        {sortedReminders.map((reminder, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "bg-white/50 p-4 rounded-lg shadow-sm border border-blue-100",
              reminder.completed && "bg-blue-50/30 border-blue-200"
            )}
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={reminder.completed}
                onCheckedChange={() => onToggleReminder(index)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getCategoryColor(reminder.category)}`} />
                  <p className={cn(
                    "font-medium text-blue-900",
                    reminder.completed && "line-through text-blue-600"
                  )}>
                    {reminder.text}
                  </p>
                </div>
                <p className="text-sm text-blue-600 mt-1">{reminder.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RemindersList;
