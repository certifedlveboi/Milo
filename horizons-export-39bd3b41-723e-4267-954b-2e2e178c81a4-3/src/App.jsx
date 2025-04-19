
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";
import { supabase } from "@/lib/supabase";
import HabitTracker from "@/components/habits/HabitTracker";
import FocusMode from "@/components/FocusMode";
import BudgetPlanning from "@/components/budget/BudgetPlanning";
import DayContent from "@/components/DayContent";
import MotivationDashboard from "@/components/motivation/MotivationDashboard";
import EmailDashboard from "@/components/email/EmailDashboard";
import TeamsDashboard from "@/components/teams/TeamsDashboard";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";

function App() {
  const [activeSection, setActiveSection] = useState("calendar");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: settings } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', user.id)
          .single();

        const { data: preferences } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (settings) {
          setUserData(settings);
        }
        
        if (!preferences) {
          setShowOnboarding(true);
        }
      }
    } catch (error) {
      console.error('Error checking user:', error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    checkUser();
  };

  const renderContent = () => {
    switch (activeSection) {
      case "calendar":
        return <DayContent />;
      case "habits":
        return <HabitTracker />;
      case "focus":
        return <FocusMode />;
      case "budget":
        return <BudgetPlanning />;
      case "email":
        return <EmailDashboard />;
      case "teams":
        return <TeamsDashboard />;
      case "motivation":
        return <MotivationDashboard />;
      default:
        return <DayContent />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <Navigation activeSection={activeSection} onSelectSection={setActiveSection} />
      
      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className="sm:max-w-[800px] h-[80vh] overflow-y-auto">
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        </DialogContent>
      </Dialog>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {userData && (
          <div className="mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-indigo-100">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {userData.name}!
              </h1>
            </div>
          </div>
        )}

        {renderContent()}
      </motion.div>
      <Toaster />
    </div>
  );
}

export default App;
