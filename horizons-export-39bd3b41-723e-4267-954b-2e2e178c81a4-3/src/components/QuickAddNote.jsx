
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

const QuickAddNote = ({ onAddNote }) => {
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.trim()) {
      onAddNote(note);
      setNote("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <Input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Type a new note..."
        className="flex-1 bg-yellow-50/50 border-yellow-200 focus-visible:ring-yellow-400"
      />
      <Button size="lg" type="submit" className="bg-yellow-500 hover:bg-yellow-600 w-12 h-12">
        <Plus className="h-6 w-6" />
      </Button>
    </form>
  );
};

export default QuickAddNote;
