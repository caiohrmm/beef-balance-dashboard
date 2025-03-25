
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import WeightEvolutionChart from "../components/dashboard/WeightEvolutionChart";
import CostComparisonChart from "../components/dashboard/CostComparisonChart";
import ProfitProjectionChart from "../components/dashboard/ProfitProjectionChart";
import { ButtonCustom } from "../components/ui/button-custom";

const Dashboard: React.FC = () => {
  // Mock data for dashboard
  const summaryData = {
    activeOperations: 2,
    totalCattle: 80,
    averageWeight: 420,
    averageCost: 3200,
    projectedProfit: 128000,
    timeframe: 12
  };

  const weightEvolutionData = [
    { month: "Jan", realWeight: 350, projectedWeight: 350 },
    { month: "Fev", realWeight: 372, projectedWeight: 370 },
    { month: "Mar", realWeight: 390, projectedWeight: 390 },
    { month: "Abr", realWeight: 415, projectedWeight: 410 },
    { month: "Mai", realWeight: 430, projectedWeight: 430 },
    { month: "Jun", realWeight: 450, projectedWeight: 450 },
    { month: "Jul", realWeight: null, projectedWeight: 470 },
    { month: "Ago", realWeight: null, projectedWeight: 490 },
    { month: "Set", realWeight: null, projectedWeight: 510 },
    { month: "Out", realWeight: null, projectedWeight: 520 },
  ];

  const costComparisonData = [
    {
      name: "Lote 1",
      compra: 120000,
      alimentacao: 45000,
      pasto: 12000,
      manutencao: 8500,
      transporte: 4500,
    },
    {
      name: "Lote 2",
      compra: 80000,
      alimentacao: 28000,
      pasto: 10000,
      manutencao: 6000,
      transporte: 3000,
    },
  ];

  const arrobaPrices = Array.from({ length: 20 }, (_, i) => ({
    arroba: 240 + i * 10,
    lucro: (240 + i * 10) * 800 - 385000, // Simple profit calculation
  }));

  const breakEvenPrice = 320; // Arroba price where profit = 0

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-800"
          >
            Resumo da Operação
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/add-batch">
              <ButtonCustom>
                <Plus size={16} className="mr-2" />
                Novo Lote
              </ButtonCustom>
            </Link>
          </motion.div>
        </div>

        <DashboardSummary {...summaryData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeightEvolutionChart data={weightEvolutionData} />
          <CostComparisonChart data={costComparisonData} />
        </div>

        <ProfitProjectionChart data={arrobaPrices} breakEvenPrice={breakEvenPrice} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
