
import React from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import QuickAddNote from "@/components/QuickAddNote";
import { Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const getProgressColor = (percentage) => {
  if (percentage < 30) return "from-red-200 to-red-500";
  if (percentage < 70) return "from-yellow-200 to-yellow-500";
  return "from-green-200 to-green-500";
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-50";
    case "medium":
      return "bg-yellow-50";
    case "low":
      return "bg-green-50";
    default:
      return "bg-gray-50";
  }
};

const NotesList = ({ notes, onToggleNote, onAddNote, onUpdateNote }) => {
  const [editingNote, setEditingNote] = React.useState(null);
  const completedTasks = notes.filter(note => note.completed).length;
  const totalTasks = notes.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleEditNote = (note, index) => {
    setEditingNote({ ...note, index });
  };

  const handleSaveEdit = () => {
    if (editingNote) {
      onUpdateNote(editingNote.index, editingNote);
      setEditingNote(null);
    }
  };

  return (
    <div className="bg-yellow-50 rounded-lg p-6 shadow-lg border-t-4 border-yellow-400">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-yellow-800">Tasks</h3>
        {totalTasks > 0 && (
          <span className="text-sm text-yellow-600">
            {completedTasks}/{totalTasks} completed
          </span>
        )}
      </div>

      {totalTasks > 0 && (
        <div className="mb-4">
          <div className="h-2 bg-yellow-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              className={`h-full bg-gradient-to-r ${getProgressColor(progressPercentage)}`}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      <QuickAddNote onAddNote={onAddNote} />
      <div className="space-y-3 [background-image:repeating-linear-gradient(transparent,transparent_31px,#e5c07b_31px,#e5c07b_32px)] pt-[4px] max-h-[400px] overflow-y-auto pr-2">
        {notes?.map((note, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-start gap-3 p-3 rounded group transition-colors ${getPriorityColor(note.priority)}`}
            onDoubleClick={() => handleEditNote(note, index)}
          >
            <Checkbox
              id={`note-${index}`}
              checked={note.completed}
              onCheckedChange={() => onToggleNote(index)}
              className="mt-1"
            />
            <label
              htmlFor={`note-${index}`}
              className={`flex-1 cursor-pointer ${
                note.completed ? "line-through text-yellow-600" : "text-yellow-900"
              }`}
            >
              {note.text}
              {note.recurring && (
                <span className="ml-2 text-sm text-yellow-600">
                  (Repeats {note.recurringPattern})
                </span>
              )}
            </label>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleEditNote(note, index)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!editingNote} onOpenChange={() => setEditingNote(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editingNote && (
            <div className="space-y-4 py-4">
              <Input
                value={editingNote.text}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, text: e.target.value })
                }
                placeholder="Task description"
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select
                  value={editingNote.priority || "normal"}
                  onValueChange={(value) =>
                    setEditingNote({
                      ...editingNote,
                      priority: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Recurring Pattern</label>
                <Select
                  value={editingNote.recurring ? (editingNote.recurringPattern || "daily") : "none"}
                  onValueChange={(value) =>
                    setEditingNote({
                      ...editingNote,
                      recurring: value !== "none",
                      recurringPattern: value !== "none" ? value : null,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recurring pattern" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Recurrence</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingNote(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotesList;
