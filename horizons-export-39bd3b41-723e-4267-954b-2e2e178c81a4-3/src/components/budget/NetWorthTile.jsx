
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const NetWorthTile = ({ netWorth }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold opacity-90">Net Worth</h3>
        <p className="text-3xl font-bold mt-2">{formatCurrency(netWorth)}</p>
      </Card>
    </motion.div>
  );
};

export default NetWorthTile;
