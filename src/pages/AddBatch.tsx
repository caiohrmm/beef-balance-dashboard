
import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "../components/layout/DashboardLayout";
import AddBatchForm from "../components/forms/AddBatchForm";

const AddBatch: React.FC = () => {
  return (
    <DashboardLayout title="Cadastrar Novo Lote">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastrar Novo Lote</h2>
          <p className="text-gray-600 mb-6">
            Preencha as informações abaixo para cadastrar um novo lote de gado. 
            Os cálculos de custo inicial por arroba serão feitos automaticamente.
          </p>
        </motion.div>

        <AddBatchForm />
      </div>
    </DashboardLayout>
  );
};

export default AddBatch;
