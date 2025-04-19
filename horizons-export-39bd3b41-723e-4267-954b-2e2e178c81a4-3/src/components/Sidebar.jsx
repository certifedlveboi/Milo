
import React from "react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Calendar as CalendarIcon, Clock, Music, X } from "lucide-react";

const Sidebar = ({ onSelectSection }) => {
  const menuItems = [
    { icon: CalendarIcon, label: "Calendar", id: "calendar" },
    { icon: Clock, label: "Focus", id: "focus" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="fixed top-4 left-4">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectSection(item.id)}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
