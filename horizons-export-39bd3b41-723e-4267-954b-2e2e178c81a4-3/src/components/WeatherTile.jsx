
import React, { useMemo } from "react";
import { Cloud, Sun, CloudRain, Wind, Thermometer } from "lucide-react";
import { motion } from "framer-motion";

const WeatherTile = () => {
  // Simulated weather - in real app, this would come from a weather API
  const weatherTypes = [
    { icon: Sun, temp: "75°F", desc: "Sunny", humidity: "45%", wind: "5 mph" },
    { icon: Cloud, temp: "68°F", desc: "Cloudy", humidity: "65%", wind: "8 mph" },
    { icon: CloudRain, temp: "62°F", desc: "Rainy", humidity: "80%", wind: "12 mph" }
  ];
  
  // Use useMemo to keep the same weather during re-renders
  const randomWeather = useMemo(() => {
    return weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
  }, []);
  
  const WeatherIcon = randomWeather.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Today's Weather</h3>
        <WeatherIcon className="h-8 w-8" />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold">{randomWeather.temp}</div>
          <div className="text-blue-100">{randomWeather.desc}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-blue-400">
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-blue-200" />
            <span className="text-sm text-blue-100">{randomWeather.wind}</span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-blue-200" />
            <span className="text-sm text-blue-100">{randomWeather.humidity}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherTile;
