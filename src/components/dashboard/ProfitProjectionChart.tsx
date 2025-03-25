
import React, { useState } from "react";
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
  ReferenceLine,
} from "recharts";
import { ButtonCustom } from "../button-custom";

interface ProfitProjectionChartProps {
  data: {
    arroba: number;
    lucro: number;
  }[];
  breakEvenPrice: number;
}

const ProfitProjectionChart: React.FC<ProfitProjectionChartProps> = ({ 
  data, 
  breakEvenPrice 
}) => {
  const [showBreakEven, setShowBreakEven] = useState(true);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium text-gray-800">R$ {label.toFixed(2)} / @</p>
          <p className={`text-${payload[0].value >= 0 ? 'green' : 'red'}-600 font-medium`}>
            Lucro: R$ {payload[0].value.toLocaleString('pt-BR')}
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
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-lg shadow-sm p-4 h-80"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Projeção de Lucro</h3>
        <ButtonCustom 
          variant="outline" 
          size="sm"
          onClick={() => setShowBreakEven(!showBreakEven)}
        >
          {showBreakEven ? "Esconder" : "Mostrar"} Ponto de Equilíbrio
        </ButtonCustom>
      </div>
      <ResponsiveContainer width="100%" height="85%">
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
            dataKey="arroba" 
            tickLine={false}
            axisLine={{ stroke: "#e0e0e0" }}
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => `R$ ${value}`}
            label={{ value: 'Preço da Arroba', position: 'insideBottomRight', offset: -5 }}
          />
          <YAxis 
            tickLine={false}
            axisLine={{ stroke: "#e0e0e0" }}
            tickFormatter={(value) => `R$ ${value / 1000}k`}
            label={{ value: 'Lucro (R$)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          {showBreakEven && (
            <ReferenceLine 
              x={breakEvenPrice} 
              stroke="#ff7300" 
              strokeDasharray="3 3" 
              label={{ 
                value: `Ponto de Equilíbrio: R$ ${breakEvenPrice.toFixed(2)}`, 
                position: 'top',
                fill: '#ff7300',
                fontSize: 12
              }} 
            />
          )}
          <ReferenceLine y={0} stroke="#666" strokeDasharray="2 2" />
          <Line
            type="monotone"
            dataKey="lucro"
            stroke="#3c8862"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 8, fill: "#3c8862", stroke: "#fff", strokeWidth: 2 }}
            animationDuration={2000}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ProfitProjectionChart;
