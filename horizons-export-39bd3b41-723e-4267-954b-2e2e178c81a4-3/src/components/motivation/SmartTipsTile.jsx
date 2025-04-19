
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const SmartTipsTile = () => {
  const tips = [
    "Try breaking large tasks into smaller, manageable chunks",
    "Take a 5-minute break every 25 minutes of focused work",
    "Stay hydrated throughout the day for better concentration",
  ];

  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-amber-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Smart Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-yellow-500 font-bold">•</span>
              <span className="text-sm text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SmartTipsTile;
