
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Smile, Frown, Meh } from "lucide-react";
import { motion } from "framer-motion";

const MoodBoostTile = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = [
    { icon: Smile, label: "Happy", color: "text-green-500" },
    { icon: Meh, label: "Neutral", color: "text-yellow-500" },
    { icon: Frown, label: "Sad", color: "text-blue-500" },
  ];

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Smile className="h-5 w-5 text-purple-500" />
          Mood Boost
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around items-center">
          {moods.map((mood, index) => {
            const Icon = mood.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(mood.label)}
                className={`p-3 rounded-full transition-colors ${
                  selectedMood === mood.label
                    ? "bg-white shadow-lg"
                    : "hover:bg-white/50"
                }`}
              >
                <Icon
                  className={`h-8 w-8 ${
                    selectedMood === mood.label ? mood.color : "text-gray-400"
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
        {selectedMood && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-4 text-sm text-gray-600"
          >
            Thanks for sharing! We'll adjust your experience based on your mood.
          </motion.p>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodBoostTile;
