
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Newspaper } from "lucide-react";

const NewsForYouTile = () => {
  const news = [
    {
      title: "Your Productivity Streak!",
      description: "You've completed 80% of your tasks this week - keep it up!",
    },
    {
      title: "New Achievement",
      description: "You've maintained your daily habits for 5 days straight!",
    },
  ];

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Newspaper className="h-5 w-5 text-blue-500" />
          News For You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsForYouTile;
