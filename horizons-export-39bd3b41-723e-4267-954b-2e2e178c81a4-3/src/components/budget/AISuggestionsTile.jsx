
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb } from "lucide-react";

const AISuggestionsTile = ({ suggestions }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5" />
          <h3 className="text-lg font-semibold">AI Suggestions</h3>
        </div>
        <ScrollArea className="h-[200px] w-full">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="py-3 border-b border-white/10"
            >
              <p className="text-sm">{suggestion}</p>
            </div>
          ))}
        </ScrollArea>
      </Card>
    </motion.div>
  );
};

export default AISuggestionsTile;
