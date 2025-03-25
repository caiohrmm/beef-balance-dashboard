
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Plus, X, DollarSign, Package } from "lucide-react";
import { ButtonCustom } from "../button-custom";
import { toast } from "@/hooks/use-toast";

interface Ingredient {
  id: string;
  name: string;
  percentage: number;
  pricePerKg: number;
}

interface RationCalculationResult {
  totalWeight: number;
  ingredients: {
    name: string;
    weight: number;
    cost: number;
    percentage: number;
  }[];
  totalCost: number;
  costPerKg: number;
  dailyConsumption: number;
  dailyCost: number;
  dailyCostPerHead: number;
}

const RationCalculatorForm: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: "1", name: "Farelo de Milho", percentage: 50, pricePerKg: 2.5 },
    { id: "2", name: "Farelo de Soja", percentage: 30, pricePerKg: 3.8 },
    { id: "3", name: "Núcleo Mineral", percentage: 10, pricePerKg: 8.2 },
    { id: "4", name: "Ureia", percentage: 10, pricePerKg: 5.5 },
  ]);
  
  const [totalRationWeight, setTotalRationWeight] = useState<number>(100);
  const [cattleCount, setCattleCount] = useState<number>(80);
  const [dailyConsumptionPerHead, setDailyConsumptionPerHead] = useState<number>(2.5);
  const [calculationResult, setCalculationResult] = useState<RationCalculationResult | null>(null);
  
  const addIngredient = () => {
    const newId = (ingredients.length + 1).toString();
    setIngredients([
      ...ingredients,
      { id: newId, name: "", percentage: 0, pricePerKg: 0 }
    ]);
  };
  
  const removeIngredient = (id: string) => {
    if (ingredients.length <= 1) {
      toast({
        title: "Não é possível remover",
        description: "Você precisa ter pelo menos um ingrediente.",
        variant: "destructive"
      });
      return;
    }
    
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
  };
  
  const updateIngredient = (id: string, field: keyof Ingredient, value: string | number) => {
    setIngredients(
      ingredients.map(ingredient => {
        if (ingredient.id === id) {
          return { ...ingredient, [field]: value };
        }
        return ingredient;
      })
    );
  };
  
  const calculateTotalPercentage = (): number => {
    return ingredients.reduce((sum, ingredient) => sum + ingredient.percentage, 0);
  };
  
  const calculateRation = () => {
    const totalPercentage = calculateTotalPercentage();
    
    if (totalPercentage !== 100) {
      toast({
        title: "Percentual incorreto",
        description: `A soma dos percentuais deve ser 100%. Atualmente é ${totalPercentage}%.`,
        variant: "destructive"
      });
      return;
    }
    
    const calculatedIngredients = ingredients.map(ingredient => {
      const weight = (ingredient.percentage / 100) * totalRationWeight;
      const cost = weight * ingredient.pricePerKg;
      
      return {
        name: ingredient.name,
        weight,
        cost,
        percentage: ingredient.percentage
      };
    });
    
    const totalCost = calculatedIngredients.reduce((sum, ingredient) => sum + ingredient.cost, 0);
    const costPerKg = totalCost / totalRationWeight;
    
    const dailyConsumption = dailyConsumptionPerHead * cattleCount;
    const dailyCost = dailyConsumption * costPerKg;
    const dailyCostPerHead = dailyCost / cattleCount;
    
    setCalculationResult({
      totalWeight: totalRationWeight,
      ingredients: calculatedIngredients,
      totalCost,
      costPerKg,
      dailyConsumption,
      dailyCost,
      dailyCostPerHead
    });
    
    toast({
      title: "Cálculo realizado",
      description: "Os resultados estão disponíveis abaixo."
    });
  };
  
  return (
    <div className="space-y-8">
      <motion.div 
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-primary" />
          Composição da Ração
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Peso Total da Ração (kg)
              </label>
              <input
                type="number"
                value={totalRationWeight}
                onChange={(e) => setTotalRationWeight(parseFloat(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                min="0"
                step="0.1"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade de Gado
              </label>
              <input
                type="number"
                value={cattleCount}
                onChange={(e) => setCattleCount(parseInt(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                min="0"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Consumo Diário por Cabeça (kg)
              </label>
              <input
                type="number"
                value={dailyConsumptionPerHead}
                onChange={(e) => setDailyConsumptionPerHead(parseFloat(e.target.value) || 0)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                min="0"
                step="0.1"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Ingredientes</h4>
              <div className="text-sm text-gray-600">
                Total: {calculateTotalPercentage()}%
                <span className={calculateTotalPercentage() !== 100 ? "text-red-500 ml-2" : "text-green-500 ml-2"}>
                  {calculateTotalPercentage() !== 100 ? "(Deve ser 100%)" : "✓"}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-2 text-sm font-medium text-gray-500 pb-1 border-b">
                <div className="col-span-4">Nome</div>
                <div className="col-span-3">Percentual (%)</div>
                <div className="col-span-4">Preço (R$/kg)</div>
                <div className="col-span-1"></div>
              </div>
              
              {ingredients.map((ingredient) => (
                <div key={ingredient.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={ingredient.name}
                      onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Nome do ingrediente"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="number"
                      value={ingredient.percentage}
                      onChange={(e) => updateIngredient(ingredient.id, 'percentage', parseFloat(e.target.value) || 0)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>
                  <div className="col-span-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">R$</span>
                      </div>
                      <input
                        type="number"
                        value={ingredient.pricePerKg}
                        onChange={(e) => updateIngredient(ingredient.id, 'pricePerKg', parseFloat(e.target.value) || 0)}
                        className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => removeIngredient(ingredient.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remover ingrediente"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex items-center">
              <ButtonCustom
                type="button"
                variant="outline"
                size="sm"
                onClick={addIngredient}
                className="mr-2"
              >
                <Plus size={14} className="mr-1" /> Adicionar Ingrediente
              </ButtonCustom>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end border-t mt-6">
            <ButtonCustom
              type="button"
              onClick={calculateRation}
              className="w-full sm:w-auto"
            >
              <Calculator size={16} className="mr-2" /> Calcular Custos
            </ButtonCustom>
          </div>
        </div>
      </motion.div>
      
      {calculationResult && (
        <motion.div
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-medium mb-6 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-primary" />
            Resultado do Cálculo
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Custo Total da Ração</h4>
              <p className="text-2xl font-bold text-primary">
                R$ {calculationResult.totalCost.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Para {calculationResult.totalWeight}kg de ração
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Custo por Kg</h4>
              <p className="text-2xl font-bold text-primary">
                R$ {calculationResult.costPerKg.toFixed(2)}/kg
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Consumo Diário Total</h4>
              <p className="text-2xl font-bold text-primary">
                {calculationResult.dailyConsumption.toFixed(1)}kg
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {calculationResult.dailyCostPerHead.toFixed(2)} R$/cabeça/dia
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Detalhe dos Ingredientes</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ingrediente
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentual
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantidade (kg)
                    </th>
                    <th className="px-4 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Custo (R$)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {calculationResult.ingredients.map((ingredient, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {ingredient.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                        {ingredient.percentage}%
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                        {ingredient.weight.toFixed(2)}kg
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium text-right">
                        R$ {ingredient.cost.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      Total
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium text-right">
                      100%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium text-right">
                      {calculationResult.totalWeight.toFixed(2)}kg
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium text-right">
                      R$ {calculationResult.totalCost.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-primary-50 border border-primary-100 rounded-lg">
            <h4 className="font-medium text-primary-700 mb-2 flex items-center">
              <Package size={16} className="mr-2" />
              Custo Diário do Lote
            </h4>
            <p className="text-gray-700">
              Com {cattleCount} animais consumindo {dailyConsumptionPerHead}kg por dia, o custo diário total será de{" "}
              <span className="font-bold text-primary">
                R$ {calculationResult.dailyCost.toFixed(2)}
              </span>.
            </p>
            <p className="text-gray-700 mt-1">
              Isso representa um custo de{" "}
              <span className="font-bold text-primary">
                R$ {calculationResult.dailyCostPerHead.toFixed(2)}
              </span>{" "}
              por cabeça por dia.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RationCalculatorForm;
