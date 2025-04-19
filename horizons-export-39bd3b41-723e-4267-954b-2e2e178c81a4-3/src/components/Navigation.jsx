
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Gauge, 
  Clock, 
  Wallet, 
  Activity, 
  Sparkles, 
  Mail, 
  Users,
  Bell,
  Settings,
  LogOut,
  Palette,
  Camera
} from "lucide-react";
import { cn } from "@/lib/utils";
import StreakCounter from "./StreakCounter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const Navigation = ({ activeSection, onSelectSection }) => {
  const [notifications, setNotifications] = useState([]);
  const { toast } = useToast();
  
  const menuItems = [
    { icon: Gauge, label: "Cockpit", id: "calendar" },
    { icon: Activity, label: "Habits", id: "habits" },
    { icon: Clock, label: "Focus", id: "focus" },
    { icon: Wallet, label: "Budget", id: "budget" },
    { icon: Mail, label: "Email", id: "email" },
    { icon: Users, label: "Teams", id: "teams" },
    { icon: Sparkles, label: "Motivation", id: "motivation" },
  ];

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  const handleProfilePhotoUpdate = () => {
    toast({
      title: "Coming Soon",
      description: "Profile photo update will be available soon!",
    });
  };

  const handleAppearanceChange = () => {
    toast({
      title: "Coming Soon",
      description: "Appearance customization will be available soon!",
    });
  };

  const handleSettingsChange = () => {
    toast({
      title: "Coming Soon",
      description: "Settings configuration will be available soon!",
    });
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg py-3 px-6 mb-6 rounded-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mr-12"
          >
            Milo
          </motion.h1>
          <div className="flex items-center gap-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectSection(item.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
                    activeSection === item.id
                      ? "bg-white text-indigo-700 shadow-lg"
                      : "text-white hover:bg-white/10"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-semibold">{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
        
        <div className="flex items-center gap-12">
          <StreakCounter />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-12 w-12 rounded-full hover:bg-white/10">
                <Bell className="h-7 w-7 text-white" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs font-medium text-white flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  No new notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id}>
                    {notification.message}
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfilePhotoUpdate}>
                <Camera className="mr-2 h-4 w-4" />
                <span>Change Photo</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettingsChange}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleAppearanceChange}>
                <Palette className="mr-2 h-4 w-4" />
                <span>Appearance</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
