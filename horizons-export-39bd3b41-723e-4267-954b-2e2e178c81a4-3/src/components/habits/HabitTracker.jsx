
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Check, Trophy, Target, Calendar, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import ReactConfetti from 'react-confetti';
import AddHabitDialog from "./AddHabitDialog";

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('habits')
          .select(`
            *,
            habit_streaks (
              current_streak,
              longest_streak
            ),
            habit_completions (
              completed_at
            )
          `)
          .eq('user_id', user.id);

        if (error) throw error;
        setHabits(data || []);
      }
    } catch (error) {
      console.error('Error fetching habits:', error);
      toast({
        title: "Error",
        description: "Failed to load habits. Please try again.",
        variant: "destructive"
      });
    }
  };

  const addHabit = async (habitData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('habits')
          .insert({
            ...habitData,
            user_id: user.id,
            created_at: new Date().toISOString()
          })
          .select()
          .single();

        if (error) throw error;

        // Initialize streak
        await supabase
          .from('habit_streaks')
          .insert({
            habit_id: data.id,
            user_id: user.id,
            current_streak: 0,
            longest_streak: 0
          });

        setShowAddDialog(false);
        fetchHabits();
        toast({
          title: "Success!",
          description: "New habit added successfully.",
        });
      }
    } catch (error) {
      console.error('Error adding habit:', error);
      toast({
        title: "Error",
        description: "Failed to add habit. Please try again.",
        variant: "destructive"
      });
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      const { error } = await supabase
        .from('habits')
        .delete()
        .eq('id', habitId);

      if (error) throw error;

      fetchHabits();
      toast({
        title: "Success",
        description: "Habit deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting habit:', error);
      toast({
        title: "Error",
        description: "Failed to delete habit. Please try again.",
        variant: "destructive"
      });
    }
  };

  const completeHabit = async (habitId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('habit_completions')
          .insert({
            habit_id: habitId,
            user_id: user.id,
            completed_at: new Date().toISOString()
          });

        if (error) throw error;

        // Update streak
        const { data: streakData } = await supabase
          .from('habit_streaks')
          .select('current_streak, longest_streak')
          .eq('habit_id', habitId)
          .single();

        const newStreak = (streakData?.current_streak || 0) + 1;
        const newLongestStreak = Math.max(newStreak, streakData?.longest_streak || 0);

        await supabase
          .from('habit_streaks')
          .upsert({
            habit_id: habitId,
            user_id: user.id,
            current_streak: newStreak,
            longest_streak: newLongestStreak,
            last_completed: new Date().toISOString()
          });

        if (newStreak >= 7) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }

        fetchHabits();
        toast({
          title: "Habit completed!",
          description: `${newStreak} day streak! Keep it up!`,
        });
      }
    } catch (error) {
      console.error('Error completing habit:', error);
      toast({
        title: "Error",
        description: "Failed to mark habit as complete. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {showConfetti && <ReactConfetti />}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Habits</CardTitle>
            <Button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Habit
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                <AnimatePresence>
                  {habits.map((habit) => (
                    <motion.div
                      key={habit.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-lg p-6 shadow-sm border"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800">{habit.name}</h3>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {habit.frequency}
                          </p>
                          {habit.target_goal && (
                            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                              <Target className="h-4 w-4" />
                              Goal: {habit.target_goal}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => completeHabit(habit.id)}
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <Check className="h-4 w-4" />
                            Complete
                          </Button>
                          <Button
                            onClick={() => deleteHabit(habit.id)}
                            variant="destructive"
                            size="icon"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Current Streak</span>
                          <span className="flex items-center gap-1">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            {habit.habit_streaks?.[0]?.current_streak || 0} days
                          </span>
                        </div>
                        <Progress
                          value={((habit.habit_streaks?.[0]?.current_streak || 0) / 7) * 100}
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Best Streak: {habit.habit_streaks?.[0]?.longest_streak || 0} days</span>
                          <span>Goal: 7 days</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <AddHabitDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddHabit={addHabit}
      />
    </div>
  );
};

export default HabitTracker;
