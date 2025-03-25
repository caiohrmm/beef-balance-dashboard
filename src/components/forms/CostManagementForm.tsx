
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wheat, TreePine, Tool, Truck, Calculator } from "lucide-react";
import { ButtonCustom } from "../ui/button-custom";
import { useToast } from "@/hooks/use-toast";

interface CostItem {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
}

const CostManagementForm: React.FC = () => {
  const [category, setCategory] = useState("alimentacao");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | ''>('');
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [costs, setCosts] = useState<CostItem[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState("batch1");
  const [isLoading, setIsLoading] = useState(false);
  const [monthlyCost, setMonthlyCost] = useState<number | null>(null);
  const [dailyConsumption, setDailyConsumption] = useState<number | null>(null);

  const { toast } = useToast();

  // Simulated data
  const batches = [
    { id: "batch1", name: "Lote 1 - Nelore 2023", cattleCount: 50, currentWeight: 420 },
    { id: "batch2", name: "Lote 2 - Angus 2023", cattleCount: 30, currentWeight: 380 },
  ];

  const selectedBatch = batches.find(batch => batch.id === selectedBatchId);

  useEffect(() => {
    if (selectedBatch) {
      // Calculate daily consumption based on current weight
      const consumption = selectedBatch.currentWeight * 0.003;
      setDailyConsumption(consumption);
      
      // Calculate monthly cost for current batch
      const monthlyCostPerHead = calculateMonthlyCostPerHead();
      setMonthlyCost(monthlyCostPerHead * selectedBatch.cattleCount);
    }
  }, [selectedBatchId, costs]);

  const calculateMonthlyCostPerHead = () => {
    // Group costs by category
    const categoryTotals = costs.reduce((acc: Record<string, number>, cost) => {
      if (!acc[cost.category]) {
        acc[cost.category] = 0;
      }
      acc[cost.category] += cost.amount;
      return acc;
    }, {});
    
    const foodCost = categoryTotals["alimentacao"] || 0;
    const pastureCost = categoryTotals["pasto"] || 0;
    const maintenanceCost = categoryTotals["manutencao"] || 0;
    
    // Monthly cost per head = (food + pasture + maintenance) / cattle count
    return selectedBatch ? (foodCost + pastureCost + maintenanceCost) / selectedBatch.cattleCount : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount) {
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
      const newCost: CostItem = {
        id: Date.now().toString(),
        category,
        description,
        amount: Number(amount),
        date,
      };
      
      setCosts([...costs, newCost]);
      setIsLoading(false);
      toast({
        title: "Custo adicionado com sucesso",
        description: "O novo custo foi registrado no sistema",
      });
      
      // Reset form
      setDescription("");
      setAmount('');
    }, 800);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "alimentacao":
        return <Wheat size={16} className="text-green-600" />;
      case "pasto":
        return <TreePine size={16} className="text-green-700" />;
      case "manutencao":
        return <Tool size={16} className="text-blue-600" />;
      case "transporte":
        return <Truck size={16} className="text-purple-600" />;
      default:
        return null;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "alimentacao":
        return "Alimentação";
      case "pasto":
        return "Pasto";
      case "manutencao":
        return "Manutenção";
      case "transporte":
        return "Transporte";
      default:
        return category;
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-6 md:col-span-2"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Registrar Novo Custo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="batch" className="form-label">
                Lote
              </label>
              <select
                id="batch"
                className="form-select"
                value={selectedBatchId}
                onChange={(e) => setSelectedBatchId(e.target.value)}
                required
              >
                {batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Categoria
              </label>
              <select
                id="category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="alimentacao">Alimentação</option>
                <option value="pasto">Arrendamento de Pasto</option>
                <option value="manutencao">Mão de Obra/Manutenção</option>
                <option value="transporte">Transporte/Combustível</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Descrição
            </label>
            <input
              id="description"
              type="text"
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Farelo de milho"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="amount" className="form-label">
                Valor (R$)
              </label>
              <input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                className="form-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                placeholder="Ex: 1500.00"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date" className="form-label">
                Data
              </label>
              <input
                id="date"
                type="date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <ButtonCustom
              type="submit"
              isLoading={isLoading}
            >
              Adicionar Custo
            </ButtonCustom>
          </div>
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-panel p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Cálculos Automáticos</h2>
        
        {selectedBatch && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-agro-50 border border-agro-200">
              <div className="flex items-center mb-2">
                <Calculator size={18} className="text-agro-600 mr-2" />
                <h3 className="font-medium text-agro-800">Consumo Diário</h3>
              </div>
              <p className="text-gray-700">
                <span className="font-medium">Consumo por animal:</span>{" "}
                <span className="text-agro-700 font-bold">
                  {dailyConsumption !== null ? dailyConsumption.toFixed(2) : "0.00"} kg
                </span>
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Consumo total do lote:</span>{" "}
                <span className="text-agro-700 font-bold">
                  {dailyConsumption !== null 
                    ? (dailyConsumption * selectedBatch.cattleCount).toFixed(2) 
                    : "0.00"} kg/dia
                </span>
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-agro-50 border border-agro-200">
              <div className="flex items-center mb-2">
                <Calculator size={18} className="text-agro-600 mr-2" />
                <h3 className="font-medium text-agro-800">Custo Mensal</h3>
              </div>
              <p className="text-gray-700">
                <span className="font-medium">Custo por cabeça:</span>{" "}
                <span className="text-agro-700 font-bold">
                  {formatCurrency(monthlyCost ? monthlyCost / selectedBatch.cattleCount : 0)}
                </span>
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Custo total do lote:</span>{" "}
                <span className="text-agro-700 font-bold">
                  {formatCurrency(monthlyCost || 0)}
                </span>
              </p>
            </div>
          </div>
        )}
        
        <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Últimos Custos</h3>
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {costs.length > 0 ? (
            costs.map((cost) => (
              <div 
                key={cost.id} 
                className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="p-2 rounded-full bg-gray-100 mr-3">
                      {getCategoryIcon(cost.category)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{cost.description}</p>
                      <p className="text-xs text-gray-500">
                        {getCategoryName(cost.category)} • {new Date(cost.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-agro-700">
                    {formatCurrency(cost.amount)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic text-center py-4">
              Nenhum custo registrado ainda
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CostManagementForm;
