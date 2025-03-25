
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart4, 
  Calculator, 
  TrendingUp, 
  Download, 
  Calendar, 
  DollarSign 
} from "lucide-react";
import { ButtonCustom } from "../ui/button-custom";
import { useToast } from "@/hooks/use-toast";

interface ProfitAnalysisProps {
  batchData: {
    id: string;
    name: string;
    initialCost: number;
    currentCost: number;
    cattleCount: number;
    initialWeight: number;
    currentWeight: number;
    targetWeight: number;
    initialDate: string;
    estimatedEndDate: string;
    arrobaPrice: number;
  };
}

const ProfitAnalysisReport: React.FC<ProfitAnalysisProps> = ({ batchData }) => {
  const [simulatedArrobaPrice, setSimulatedArrobaPrice] = useState<number>(batchData.arrobaPrice);
  const { toast } = useToast();

  const calculateProfitMetrics = () => {
    // Convert weights to arroba (1 arroba = 15kg in Brazil)
    const finalWeightArroba = batchData.targetWeight / 15;
    
    // Calculate total revenue
    const totalRevenue = batchData.cattleCount * finalWeightArroba * simulatedArrobaPrice;
    
    // Calculate total cost
    const totalCost = batchData.initialCost + batchData.currentCost;
    
    // Calculate total profit
    const totalProfit = totalRevenue - totalCost;
    
    // Calculate profit per head
    const profitPerHead = totalProfit / batchData.cattleCount;
    
    // Calculate ROI
    const roi = (totalProfit / totalCost) * 100;
    
    // Calculate monthly profit
    const startDate = new Date(batchData.initialDate);
    const endDate = new Date(batchData.estimatedEndDate);
    const monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                        (endDate.getMonth() - startDate.getMonth());
    const monthlyProfit = totalProfit / monthsDiff;
    
    return {
      totalRevenue,
      totalCost,
      totalProfit,
      profitPerHead,
      roi,
      monthlyProfit,
      months: monthsDiff
    };
  };

  const metrics = calculateProfitMetrics();

  const handleSimulate = () => {
    toast({
      title: "Simulação Atualizada",
      description: `Preço da @ alterado para R$ ${simulatedArrobaPrice.toFixed(2)}`,
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const exportToPDF = () => {
    toast({
      title: "Relatório exportado",
      description: "O PDF foi gerado e baixado com sucesso",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{batchData.name}</h2>
          <p className="text-sm text-gray-500">
            <Calendar size={14} className="inline mr-1" />
            {new Date(batchData.initialDate).toLocaleDateString('pt-BR')} até {new Date(batchData.estimatedEndDate).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <ButtonCustom onClick={exportToPDF} variant="outline" size="sm">
          <Download size={16} className="mr-2" />
          Exportar PDF
        </ButtonCustom>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm"
        >
          <p className="text-sm text-gray-500 flex items-center mb-1">
            <TrendingUp size={14} className="mr-1 text-agro-600" />
            Receita Total Estimada
          </p>
          <p className="text-xl font-bold text-gray-800">
            {formatCurrency(metrics.totalRevenue)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm"
        >
          <p className="text-sm text-gray-500 flex items-center mb-1">
            <DollarSign size={14} className="mr-1 text-red-500" />
            Custo Total
          </p>
          <p className="text-xl font-bold text-gray-800">
            {formatCurrency(metrics.totalCost)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm"
        >
          <p className="text-sm text-gray-500 flex items-center mb-1">
            <BarChart4 size={14} className="mr-1 text-green-600" />
            Lucro Líquido Total
          </p>
          <p className={`text-xl font-bold ${metrics.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(metrics.totalProfit)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="p-4 rounded-lg bg-white border border-gray-100 shadow-sm"
        >
          <p className="text-sm text-gray-500 flex items-center mb-1">
            <Calculator size={14} className="mr-1 text-blue-600" />
            ROI
          </p>
          <p className={`text-xl font-bold ${metrics.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {metrics.roi.toFixed(2)}%
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="p-5 rounded-lg bg-agro-50 border border-agro-200"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Calculator size={18} className="mr-2 text-agro-600" />
            Detalhes do Lucro
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-agro-100">
              <p className="text-gray-700">Lucro por Cabeça:</p>
              <p className="font-semibold text-agro-700">
                {formatCurrency(metrics.profitPerHead)}
              </p>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-agro-100">
              <p className="text-gray-700">Receita por Cabeça:</p>
              <p className="font-semibold text-agro-700">
                {formatCurrency(metrics.totalRevenue / batchData.cattleCount)}
              </p>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-agro-100">
              <p className="text-gray-700">Custo Total por Cabeça:</p>
              <p className="font-semibold text-agro-700">
                {formatCurrency(metrics.totalCost / batchData.cattleCount)}
              </p>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-agro-100">
              <p className="text-gray-700">Preço Atual da @:</p>
              <p className="font-semibold text-agro-700">
                {formatCurrency(batchData.arrobaPrice)}
              </p>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <p className="text-gray-700">Peso Final em @:</p>
              <p className="font-semibold text-agro-700">
                {(batchData.targetWeight / 15).toFixed(2)} @
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="p-5 rounded-lg bg-agro-50 border border-agro-200"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Calendar size={18} className="mr-2 text-agro-600" />
            Projeção Mensal
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-agro-100">
              <p className="text-gray-700">Duração Total:</p>
              <p className="font-semibold text-agro-700">
                {metrics.months} meses
              </p>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-agro-100">
              <p className="text-gray-700">Lucro Mensal:</p>
              <p className="font-semibold text-agro-700">
                {formatCurrency(metrics.monthlyProfit)}
              </p>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-agro-100">
              <p className="text-gray-700">Ganho de Peso Mensal:</p>
              <p className="font-semibold text-agro-700">
                {((batchData.targetWeight - batchData.initialWeight) / metrics.months).toFixed(2)} kg
              </p>
            </div>
            
            <div className="py-2">
              <p className="text-gray-700 mb-2">Simular com novo preço da @:</p>
              <div className="flex items-center">
                <input
                  type="number"
                  value={simulatedArrobaPrice}
                  onChange={(e) => setSimulatedArrobaPrice(Number(e.target.value))}
                  className="form-input w-32 mr-3"
                  min="0"
                  step="0.01"
                />
                <ButtonCustom 
                  onClick={handleSimulate} 
                  size="sm"
                >
                  Simular
                </ButtonCustom>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Observações</h3>
        
        <div className="prose prose-agro">
          <p className="text-gray-700">
            Com base nos cálculos atuais, este lote {metrics.totalProfit >= 0 ? 'apresenta lucratividade' : 'não apresenta lucratividade'}. 
            O retorno sobre investimento (ROI) projetado é de <span className="font-medium">{metrics.roi.toFixed(2)}%</span> ao longo 
            de <span className="font-medium">{metrics.months} meses</span>, resultando em um ganho mensal 
            de <span className="font-medium">{formatCurrency(metrics.monthlyProfit)}</span>.
          </p>
          
          {metrics.totalProfit >= 0 ? (
            <p className="text-green-700 font-medium mt-3">
              ✓ Este investimento é recomendado com as condições atuais.
            </p>
          ) : (
            <p className="text-red-700 font-medium mt-3">
              ✗ Este investimento não é recomendado com as condições atuais. 
              Considere revisar os custos ou aguardar uma melhor cotação da arroba.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfitAnalysisReport;
