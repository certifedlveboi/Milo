
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { TimePicker } from "@/components/ui/time-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const QuickAddReminder = ({ onAddReminder }) => {
  const [reminder, setReminder] = useState("");
  const [time, setTime] = useState("12:00 AM");
  const [category, setCategory] = useState("personal");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reminder.trim() && time) {
      onAddReminder({ 
        text: reminder, 
        time,
        completed: false,
        timestamp: convertTo24Hour(time),
        category
      });
      setReminder("");
      setTime("12:00 AM");
      setCategory("personal");
    }
  };

  const convertTo24Hour = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-4">
      <Input
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
        placeholder="Add a reminder..."
        className="w-full bg-blue-50/50 border-blue-200 focus-visible:ring-blue-400"
      />
      <div className="flex gap-2">
        <TimePicker
          value={time}
          onChange={setTime}
          className="flex-1"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="fitness">Fitness</SelectItem>
          </SelectContent>
        </Select>
        <Button size="lg" type="submit" className="bg-blue-500 hover:bg-blue-600 w-12 h-12">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </form>
  );
};

export default QuickAddReminder;
