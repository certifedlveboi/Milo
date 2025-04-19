
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { supabase } from "@/lib/supabase";

const StreakCounter = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    checkAndUpdateStreak();
  }, []);

  const checkAndUpdateStreak = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let { data: streakData, error } = await supabase
        .from('app_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      if (!streakData) {
        const { data } = await supabase
          .from('app_streaks')
          .insert({
            user_id: user.id,
            current_streak: 1,
            last_active: now.toISOString()
          })
          .select()
          .single();
        
        streakData = data;
      } else {
        const lastActive = new Date(streakData.last_active);
        const lastActiveDay = new Date(
          lastActive.getFullYear(),
          lastActive.getMonth(),
          lastActive.getDate()
        );
        
        const diffDays = Math.floor((today - lastActiveDay) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
          setStreak(streakData.current_streak);
          return;
        } else if (diffDays === 1) {
          const { data } = await supabase
            .from('app_streaks')
            .update({
              current_streak: streakData.current_streak + 1,
              last_active: now.toISOString()
            })
            .eq('user_id', user.id)
            .select()
            .single();
          
          streakData = data;
        } else {
          const { data } = await supabase
            .from('app_streaks')
            .update({
              current_streak: 1,
              last_active: now.toISOString()
            })
            .eq('user_id', user.id)
            .select()
            .single();
          
          streakData = data;
        }
      }

      setStreak(streakData.current_streak);
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-xl shadow-lg">
      <motion.div
        animate={{
          scale: [1, 1.2, 0.9, 1.1, 1],
          rotate: [-3, 3, -3, 3, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="relative"
      >
        <motion.div
          className="absolute inset-0 blur-lg bg-orange-400 rounded-full opacity-50"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <Flame className="h-6 w-6 text-white relative z-10" />
      </motion.div>
      <span className="font-bold text-white text-lg">{streak}</span>
    </div>
  );
};

export default StreakCounter;
