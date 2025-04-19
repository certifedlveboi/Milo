
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ProgressBoostTile = () => {
  const progress = {
    weekly: 75,
    monthly: 85,
  };

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <TrendingUp className="h-5 w-5 text-green-500" />
          Progress Boost
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Weekly Progress</span>
              <span className="text-sm text-green-600">{progress.weekly}%</span>
            </div>
            <Progress value={progress.weekly} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Monthly Goals</span>
              <span className="text-sm text-green-600">{progress.monthly}%</span>
            </div>
            <Progress value={progress.monthly} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressBoostTile;
