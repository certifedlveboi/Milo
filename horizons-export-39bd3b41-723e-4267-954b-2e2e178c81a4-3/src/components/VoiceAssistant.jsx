
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Waves } from "lucide-react";
import { Card } from "@/components/ui/card";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVoiceCommand = () => {
    setIsListening(true);
    // Simulate processing
    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
    }, 3000);
  };

  return (
    <Card className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">AI Voice Assistant</h3>
          <p className="text-sm text-blue-200">
            {isListening ? "Listening..." : isProcessing ? "Processing..." : "Click the mic to start"}
          </p>
        </div>
        <motion.button
          onClick={handleVoiceCommand}
          className="relative w-12 h-12 flex items-center justify-center bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence>
            {isListening && (
              <motion.div
                className="absolute inset-0 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            )}
          </AnimatePresence>
          {isProcessing ? (
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Waves className="h-6 w-6" />
            </motion.div>
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </motion.button>
      </div>

      <motion.div
        className="mt-4 h-12 bg-blue-800/50 rounded-lg overflow-hidden"
        initial={{ width: "0%" }}
        animate={{
          width: isListening ? "100%" : "0%",
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="h-full w-full flex gap-1 px-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-blue-400"
              animate={{
                height: isListening ? ["20%", "90%", "40%", "70%"][i % 4] : "0%",
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </Card>
  );
};

export default VoiceAssistant;
