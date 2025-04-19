
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

const VoiceModeTile = () => {
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-t-4 border-purple-400">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl text-purple-800">
          <Mic className="h-5 w-5 text-purple-500" />
          Voice Mode
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-purple-500 hover:bg-purple-600 w-16 h-16 rounded-full"
              disabled
            >
              <Mic className="h-8 w-8" />
            </Button>
          </motion.div>
          <p className="text-sm text-purple-600 text-center">
            Coming soon! Voice commands for hands-free control
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceModeTile;
