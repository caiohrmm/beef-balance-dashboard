
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, Truck, Scale, Target, Calendar } from "lucide-react";
import { ButtonCustom } from "../button-custom";
import { useToast } from "@/hooks/use-toast";

const AddBatchForm: React.FC = () => {
  const [cattleCount, setCattleCount] = useState<number | ''>('');
  const [totalPurchaseValue, setTotalPurchaseValue] = useState<number | ''>('');
  const [transportCost, setTransportCost] = useState<number | ''>('');
  const [initialWeight, setInitialWeight] = useState<number | ''>('');
  const [targetWeight, setTargetWeight] = useState<number | ''>('');
  const [fatteningDuration, setFatteningDuration] = useState<number | ''>('');
  const [initialArrobaValue, setInitialArrobaValue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    calculateInitialArrobaValue();
  }, [cattleCount, totalPurchaseValue, transportCost, initialWeight]);

  const calculateInitialArrobaValue = () => {
    if (
      cattleCount !== '' && 
      totalPurchaseValue !== '' && 
      transportCost !== '' && 
      initialWeight !== '' && 
      Number(cattleCount) > 0 && 
      Number(initialWeight) > 0
    ) {
      // Convert weight from kg to arroba (1 arroba = 15kg in Brazil)
      const weightInArroba = Number(initialWeight) / 15;
      const totalInitialCost = Number(totalPurchaseValue) + Number(transportCost);
      const costPerArroba = totalInitialCost / (Number(cattleCount) * weightInArroba);
      setInitialArrobaValue(costPerArroba);
    } else {
      setInitialArrobaValue(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cattleCount || !totalPurchaseValue || !transportCost || !initialWeight || !targetWeight || !fatteningDuration) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Lote cadastrado com sucesso",
        description: "O novo lote foi adicionado ao sistema",
      });
      
      // Reset form
      setCattleCount('');
      setTotalPurchaseValue('');
      setTransportCost('');
      setInitialWeight('');
      setTargetWeight('');
      setFatteningDuration('');
      setInitialArrobaValue(null);
    }, 1000);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className="form-group"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <label htmlFor="cattleCount" className="form-label flex items-center">
              <Users size={16} className="mr-2 text-primary-600" />
              Quantidade de Cabeças
            </label>
            <input
              id="cattleCount"
              type="number"
              min="1"
              className="form-input"
              value={cattleCount}
              onChange={(e) => setCattleCount(e.target.value ? Number(e.target.value) : '')}
              placeholder="Ex: 50"
              required
            />
          </motion.div>

          <motion.div 
            className="form-group"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <label htmlFor="totalPurchaseValue" className="form-label flex items-center">
              <DollarSign size={16} className="mr-2 text-agro-600" />
              Valor Total da Compra (R$)
            </label>
            <input
              id="totalPurchaseValue"
              type="number"
              min="0"
              step="0.01"
              className="form-input"
              value={totalPurchaseValue}
              onChange={(e) => setTotalPurchaseValue(e.target.value ? Number(e.target.value) : '')}
              placeholder="Ex: 120000.00"
              required
            />
          </motion.div>

          <motion.div 
            className="form-group"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label htmlFor="transportCost" className="form-label flex items-center">
              <Truck size={16} className="mr-2 text-agro-600" />
              Custo com Transporte (R$)
            </label>
            <input
              id="transportCost"
              type="number"
              min="0"
              step="0.01"
              className="form-input"
              value={transportCost}
              onChange={(e) => setTransportCost(e.target.value ? Number(e.target.value) : '')}
              placeholder="Ex: 3000.00"
              required
            />
          </motion.div>

          <motion.div 
            className="form-group"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <label htmlFor="initialWeight" className="form-label flex items-center">
              <Scale size={16} className="mr-2 text-agro-600" />
              Peso Inicial (kg por cabeça)
            </label>
            <input
              id="initialWeight"
              type="number"
              min="0"
              step="0.1"
              className="form-input"
              value={initialWeight}
              onChange={(e) => setInitialWeight(e.target.value ? Number(e.target.value) : '')}
              placeholder="Ex: 350.0"
              required
            />
          </motion.div>

          <motion.div 
            className="form-group"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <label htmlFor="targetWeight" className="form-label flex items-center">
              <Target size={16} className="mr-2 text-agro-600" />
              Peso Final Desejado (kg por cabeça)
            </label>
            <input
              id="targetWeight"
              type="number"
              min="0"
              step="0.1"
              className="form-input"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value ? Number(e.target.value) : '')}
              placeholder="Ex: 520.0"
              required
            />
          </motion.div>

          <motion.div 
            className="form-group"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <label htmlFor="fatteningDuration" className="form-label flex items-center">
              <Calendar size={16} className="mr-2 text-agro-600" />
              Duração da Engorda (meses)
            </label>
            <input
              id="fatteningDuration"
              type="number"
              min="1"
              max="36"
              className="form-input"
              value={fatteningDuration}
              onChange={(e) => setFatteningDuration(e.target.value ? Number(e.target.value) : '')}
              placeholder="Ex: 12"
              required
            />
          </motion.div>
        </div>

        {initialArrobaValue !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 rounded-md bg-secondary border border-primary-100"
          >
            <div className="flex items-center mb-2">
              <Calculator size={18} className="text-primary-600 mr-2" />
              <h3 className="text-lg font-medium text-primary-800">Cálculos Automáticos</h3>
            </div>
            <p className="text-gray-700">
              <span className="font-medium">Valor inicial da @:</span>{" "}
              <span className="text-primary-700 font-bold">
                {formatCurrency(initialArrobaValue)}
              </span>
            </p>
          </motion.div>
        )}

        <div className="flex justify-end">
          <ButtonCustom
            type="button"
            variant="outline"
            className="mr-4"
            onClick={() => {
              // Reset form
              setCattleCount('');
              setTotalPurchaseValue('');
              setTransportCost('');
              setInitialWeight('');
              setTargetWeight('');
              setFatteningDuration('');
              setInitialArrobaValue(null);
            }}
          >
            Limpar
          </ButtonCustom>
          <ButtonCustom
            type="submit"
            isLoading={isLoading}
          >
            Cadastrar Lote
          </ButtonCustom>
        </div>
      </form>
    </motion.div>
  );
};

// Import function fix for Lucide icons
function Users(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default AddBatchForm;
