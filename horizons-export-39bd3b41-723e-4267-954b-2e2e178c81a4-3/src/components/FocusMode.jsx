
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Timer, Play, Pause, RotateCcw, Music } from "lucide-react";

const FocusMode = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setSessions((s) => s + 1);
      setTimeLeft(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Focus Mode</h2>
        <p className="text-gray-600">Stay productive with Pomodoro technique</p>
      </div>

      <motion.div
        className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl"
        animate={{
          scale: isActive ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <div className="text-4xl font-bold text-gray-800 mb-4">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
        <div className="flex gap-4">
          <Button
            variant={isActive ? "destructive" : "default"}
            size="lg"
            onClick={toggleTimer}
          >
            {isActive ? (
              <Pause className="h-5 w-5 mr-2" />
            ) : (
              <Play className="h-5 w-5 mr-2" />
            )}
            {isActive ? "Pause" : "Start"}
          </Button>
          <Button variant="outline" size="lg" onClick={resetTimer}>
            <RotateCcw className="h-5 w-5 mr-2" />
            Reset
          </Button>
        </div>
      </motion.div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Sessions Completed</span>
          <span className="text-2xl font-bold text-gray-800">{sessions}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${(sessions / 8) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-gray-800">Focus Playlist</h3>
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
          <Music className="h-6 w-6 text-gray-600" />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-800">Lo-fi Focus</div>
            <div className="text-xs text-gray-600">Perfect for deep work</div>
          </div>
          <Button variant="ghost" size="sm">
            Play
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;
