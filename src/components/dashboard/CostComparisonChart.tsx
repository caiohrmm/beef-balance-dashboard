
import React from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface CostComparisonChartProps {
  data: {
    name: string;
    compra: number;
    alimentacao: number;
    pasto: number;
    manutencao: number;
    transporte: number;
  }[];
}

const CostComparisonChart: React.FC<CostComparisonChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium text-gray-800">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p 
              key={`tooltip-${index}`} 
              style={{ color: entry.color }}
              className="flex items-center justify-between"
            >
              <span className="font-medium mr-4">{entry.name}:</span>
              <span>R$ {entry.value.toLocaleString('pt-BR')}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="chart-container h-80"
    >
      <h3 className="text-lg font-medium text-gray-800 mb-4 p-4 pb-0">Comparação de Custos</h3>
      <ResponsiveContainer width="100%" height="100%" className="p-4">
        <BarChart
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
            dataKey="name" 
            tickLine={false}
            axisLine={{ stroke: "#e0e0e0" }}
          />
          <YAxis 
            tickLine={false}
            axisLine={{ stroke: "#e0e0e0" }}
            tickFormatter={(value) => `R$ ${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Bar 
            dataKey="compra" 
            name="Compra" 
            stackId="a" 
            fill="#3c8862" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-out"
          />
          <Bar 
            dataKey="alimentacao" 
            name="Alimentação" 
            stackId="a" 
            fill="#4a90e2" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationDelay={100}
            animationEasing="ease-out"
          />
          <Bar 
            dataKey="pasto" 
            name="Pasto" 
            stackId="a" 
            fill="#f5a623" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationDelay={200}
            animationEasing="ease-out"
          />
          <Bar 
            dataKey="manutencao" 
            name="Manutenção" 
            stackId="a" 
            fill="#7ed321" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationDelay={300}
            animationEasing="ease-out"
          />
          <Bar 
            dataKey="transporte" 
            name="Transporte" 
            stackId="a" 
            fill="#9013fe" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationDelay={400}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default CostComparisonChart;
