
import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface WeightEvolutionChartProps {
  data: {
    month: string;
    realWeight: number;
    projectedWeight: number;
  }[];
}

const WeightEvolutionChart: React.FC<WeightEvolutionChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium text-gray-800">{label}</p>
          <p className="text-agro-600">
            <span className="font-medium">Real:</span> {payload[0].value} kg
          </p>
          <p className="text-blue-500">
            <span className="font-medium">Projetado:</span> {payload[1].value} kg
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="chart-container h-80"
    >
      <h3 className="text-lg font-medium text-gray-800 mb-4 p-4 pb-0">Evolução do Peso</h3>
      <ResponsiveContainer width="100%" height="100%" className="p-4">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            tickLine={false}
            axisLine={{ stroke: "#e0e0e0" }}
          />
          <YAxis 
            tickLine={false}
            axisLine={{ stroke: "#e0e0e0" }}
            domain={['dataMin - 20', 'dataMax + 20']}
            unit=" kg"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="realWeight"
            stroke="#3c8862"
            name="Peso Real"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: "white" }}
            activeDot={{ r: 6, stroke: "#2c704e", strokeWidth: 2 }}
            animationDuration={1500}
            animationEasing="ease-out"
          />
          <Line
            type="monotone"
            dataKey="projectedWeight"
            stroke="#4a90e2"
            name="Peso Projetado"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 3 }}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default WeightEvolutionChart;
