
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import NotesList from "@/components/NotesList";
import RemindersList from "@/components/RemindersList";
import VoiceModeTile from "@/components/VoiceModeTile";

const DayContent = () => {
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState([]);
  const [reminders, setReminders] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, [date]);

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch notes
      const { data: notesData, error: notesError } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .eq('timestamp', format(date, 'yyyy-MM-dd'));

      if (notesError) throw notesError;
      setNotes(notesData || []);

      // Fetch reminders
      const { data: remindersData, error: remindersError } = await supabase
        .from('reminders')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', format(date, 'yyyy-MM-dd'));

      if (remindersError) throw remindersError;
      setReminders(remindersData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load your daily data",
        variant: "destructive",
      });
    }
  };

  const handleAddNote = async (text) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const newNote = {
        text,
        user_id: user.id,
        timestamp: format(date, 'yyyy-MM-dd'),
        completed: false
      };

      const { data, error } = await supabase
        .from('notes')
        .insert([newNote])
        .select();

      if (error) throw error;

      setNotes([...notes, data[0]]);
      toast({
        title: "Success",
        description: "Note added successfully",
      });
    } catch (error) {
      console.error('Error adding note:', error);
      toast({
        title: "Error",
        description: "Failed to add note",
        variant: "destructive",
      });
    }
  };

  const handleAddReminder = async (reminderData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const newReminder = {
        ...reminderData,
        user_id: user.id,
        date: format(date, 'yyyy-MM-dd'),
        completed: false
      };

      const { data, error } = await supabase
        .from('reminders')
        .insert([newReminder])
        .select();

      if (error) throw error;

      setReminders([...reminders, data[0]]);
      toast({
        title: "Success",
        description: "Reminder added successfully",
      });
    } catch (error) {
      console.error('Error adding reminder:', error);
      toast({
        title: "Error",
        description: "Failed to add reminder",
        variant: "destructive",
      });
    }
  };

  const handleToggleNote = async (index) => {
    try {
      const noteToUpdate = notes[index];
      const { error } = await supabase
        .from('notes')
        .update({ completed: !noteToUpdate.completed })
        .eq('id', noteToUpdate.id);

      if (error) throw error;

      const updatedNotes = [...notes];
      updatedNotes[index] = { ...noteToUpdate, completed: !noteToUpdate.completed };
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error toggling note:', error);
      toast({
        title: "Error",
        description: "Failed to update note",
        variant: "destructive",
      });
    }
  };

  const handleToggleReminder = async (index) => {
    try {
      const reminderToUpdate = reminders[index];
      const { error } = await supabase
        .from('reminders')
        .update({ completed: !reminderToUpdate.completed })
        .eq('id', reminderToUpdate.id);

      if (error) throw error;

      const updatedReminders = [...reminders];
      updatedReminders[index] = { ...reminderToUpdate, completed: !reminderToUpdate.completed };
      setReminders(updatedReminders);
    } catch (error) {
      console.error('Error toggling reminder:', error);
      toast({
        title: "Error",
        description: "Failed to update reminder",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:col-span-1"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => setDate(newDate || new Date())}
          className="rounded-lg bg-white shadow-lg p-4"
        />
        <div className="mt-6">
          <VoiceModeTile />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="md:col-span-2"
      >
        <NotesList
          notes={notes}
          onToggleNote={handleToggleNote}
          onAddNote={handleAddNote}
        />
        <div className="mt-6">
          <RemindersList
            reminders={reminders}
            onAddReminder={handleAddReminder}
            onToggleReminder={handleToggleReminder}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default DayContent;
