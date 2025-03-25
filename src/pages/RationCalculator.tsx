
import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import RationCalculatorForm from "../components/forms/RationCalculatorForm";

const RationCalculator: React.FC = () => {
  return (
    <DashboardLayout title="Calculador de Ração">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Calculador de Proteico Energético</h2>
        <p className="text-gray-600">
          Calcule o custo total da ração baseado na composição e preço dos insumos.
        </p>
        <RationCalculatorForm />
      </div>
    </DashboardLayout>
  );
};

export default RationCalculator;
