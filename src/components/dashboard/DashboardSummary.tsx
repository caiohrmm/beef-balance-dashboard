
import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Scale, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";
import { AnimatedNumber } from "../ui/AnimatedNumber";

interface SummaryCardProps {
  title: string;
  value: number | string;
  label?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  delay?: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  label,
  icon,
  trend,
  trendValue,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      className="data-card"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 rounded-full bg-agro-50 text-agro-600">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold">
            {typeof value === 'number' ? (
              <AnimatedNumber value={value} />
            ) : value}
            {label && <span className="text-base font-medium ml-1">{label}</span>}
          </div>
          {trend && (
            <div className={`flex items-center mt-1 text-xs font-medium ${
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 'text-gray-500'
            }`}>
              {trend === 'up' ? (
                <ArrowUpRight size={14} className="mr-1" />
              ) : trend === 'down' ? (
                <ArrowDownRight size={14} className="mr-1" />
              ) : null}
              {trendValue}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface DashboardSummaryProps {
  activeOperations: number;
  totalCattle: number;
  averageWeight: number;
  averageCost: number;
  projectedProfit: number;
  timeframe: number;
}

const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  activeOperations,
  totalCattle,
  averageWeight,
  averageCost,
  projectedProfit,
  timeframe
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <SummaryCard
        title="Operações Ativas"
        value={activeOperations}
        icon={<TrendingUp size={18} />}
        delay={1}
      />
      <SummaryCard
        title="Total de Cabeças"
        value={totalCattle}
        icon={<Users size={18} />}
        trend="up"
        trendValue="+12 desde o mês passado"
        delay={2}
      />
      <SummaryCard
        title="Peso Médio Atual"
        value={averageWeight}
        label="kg"
        icon={<Scale size={18} />}
        trend="up"
        trendValue="+22kg desde a compra"
        delay={3}
      />
      <SummaryCard
        title="Custo Médio por Cabeça"
        value={`R$ ${averageCost.toLocaleString('pt-BR')}`}
        icon={<DollarSign size={18} />}
        trend="down"
        trendValue="-3.2% este mês"
        delay={4}
      />
      <SummaryCard
        title="Lucro Projetado"
        value={`R$ ${projectedProfit.toLocaleString('pt-BR')}`}
        icon={<DollarSign size={18} />}
        trend="up"
        trendValue="+R$ 12.500 desde a última análise"
        delay={5}
      />
      <SummaryCard
        title="Tempo Médio para Abate"
        value={timeframe}
        label="meses"
        icon={<Calendar size={18} />}
        delay={6}
      />
    </div>
  );
};

export default DashboardSummary;
