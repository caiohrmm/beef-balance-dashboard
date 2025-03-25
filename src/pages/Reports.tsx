
import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProfitAnalysisReport from "../components/reports/ProfitAnalysisReport";

const Reports: React.FC = () => {
  const [selectedBatchId, setSelectedBatchId] = useState("batch1");

  // Mock data for reports
  const batches = [
    {
      id: "batch1",
      name: "Lote 1 - Nelore 2023",
      initialCost: 120000,
      currentCost: 65000,
      cattleCount: 50,
      initialWeight: 350,
      currentWeight: 420,
      targetWeight: 520,
      initialDate: "2023-01-15",
      estimatedEndDate: "2024-01-15",
      arrobaPrice: 320,
    },
    {
      id: "batch2",
      name: "Lote 2 - Angus 2023",
      initialCost: 80000,
      currentCost: 47000,
      cattleCount: 30,
      initialWeight: 320,
      currentWeight: 380,
      targetWeight: 480,
      initialDate: "2023-03-10",
      estimatedEndDate: "2023-12-10",
      arrobaPrice: 320,
    },
  ];

  const selectedBatch = batches.find(batch => batch.id === selectedBatchId) || batches[0];

  return (
    <DashboardLayout title="Relatórios e Análises">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Relatórios e Análises</h2>
          <p className="text-gray-600 mb-6">
            Visualize análises detalhadas de lucro, custos e projeções para cada lote.
            Exporte relatórios em PDF para compartilhar com parceiros ou manter registros.
          </p>
        </motion.div>

        <div className="mb-6">
          <label htmlFor="batchSelect" className="block text-sm font-medium text-gray-700 mb-2">
            Selecione o Lote
          </label>
          <select
            id="batchSelect"
            className="form-select max-w-xs"
            value={selectedBatchId}
            onChange={(e) => setSelectedBatchId(e.target.value)}
          >
            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.name}
              </option>
            ))}
          </select>
        </div>

        <ProfitAnalysisReport batchData={selectedBatch} />
      </div>
    </DashboardLayout>
  );
};

export default Reports;
