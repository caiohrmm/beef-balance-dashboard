
import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../components/layout/DashboardLayout";
import CostManagementForm from "../components/forms/CostManagementForm";

const CostManagement: React.FC = () => {
  return (
    <DashboardLayout title="Gerenciamento de Custos">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Gerenciamento de Custos</h2>
          <p className="text-gray-600 mb-6">
            Registre e analise os custos associados a cada lote. O sistema calculará automaticamente 
            o consumo diário de alimento e o custo mensal por cabeça.
          </p>
        </motion.div>

        <CostManagementForm />
      </div>
    </DashboardLayout>
  );
};

export default CostManagement;
