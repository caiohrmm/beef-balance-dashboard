
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, RefreshCw } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ButtonCustom } from "../components/ui/button-custom";
import { useToast } from "@/hooks/use-toast";

interface PriceSettings {
  arrobaPrice: number;
  cornPrice: number;
  soybeanPrice: number;
  ureaPrice: number;
  mineralPrice: number;
  pastureCost: number;
  laborCost: number;
  transportPrice: number;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<PriceSettings>({
    arrobaPrice: 320,
    cornPrice: 58.50,
    soybeanPrice: 120.75,
    ureaPrice: 150.00,
    mineralPrice: 85.30,
    pastureCost: 70.00,
    laborCost: 2500,
    transportPrice: 6.50,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: parseFloat(value),
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Configurações salvas",
        description: "As configurações foram atualizadas com sucesso",
      });
    }, 1000);
  };

  const handleReset = () => {
    setSettings({
      arrobaPrice: 320,
      cornPrice: 58.50,
      soybeanPrice: 120.75,
      ureaPrice: 150.00,
      mineralPrice: 85.30,
      pastureCost: 70.00,
      laborCost: 2500,
      transportPrice: 6.50,
    });
    
    toast({
      title: "Configurações redefinidas",
      description: "Os valores padrão foram restaurados",
    });
  };

  return (
    <DashboardLayout title="Configurações">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Configurações</h2>
          <p className="text-gray-600 mb-6">
            Personalize os preços de insumos e valores utilizados nos cálculos e simulações.
            Estas configurações serão aplicadas aos novos lotes e simulações.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSave}
          className="glass-panel p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            <div className="form-group">
              <label htmlFor="arrobaPrice" className="form-label">
                Preço da Arroba (R$)
              </label>
              <input
                id="arrobaPrice"
                name="arrobaPrice"
                type="number"
                min="0"
                step="0.01"
                className="form-input"
                value={settings.arrobaPrice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cornPrice" className="form-label">
                Preço do Farelo de Milho (R$/saca)
              </label>
              <input
                id="cornPrice"
                name="cornPrice"
                type="number"
                min="0"
                step="0.01"
                className="form-input"
                value={settings.cornPrice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="soybeanPrice" className="form-label">
                Preço do Farelo de Soja (R$/saca)
              </label>
              <input
                id="soybeanPrice"
                name="soybeanPrice"
                type="number"
                min="0"
                step="0.01"
                className="form-input"
                value={settings.soybeanPrice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="ureaPrice" className="form-label">
                Preço da Ureia (R$/saca)
              </label>
              <input
                id="ureaPrice"
                name="ureaPrice"
                type="number"
                min="0"
                step="0.01"
                className="form-input"
                value={settings.ureaPrice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="mineralPrice" className="form-label">
                Preço do Núcleo Mineral (R$/saca)
              </label>
              <input
                id="mineralPrice"
                name="mineralPrice"
                type="number"
                min="0"
                step="0.01"
                className="form-input"
                value={settings.mineralPrice}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="pastureCost" className="form-label">
                Custo de Arrendamento (R$/cabeça/mês)
              </label>
              <input
                id="pastureCost"
                name="pastureCost"
                type="number"
                min="0"
                step="0.01"
                className="form-input"
                value={settings.pastureCost}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="laborCost" className="form-label">
                Custo de Mão de Obra Mensal (R$)
              </label>
              <input
                id="laborCost"
                name="laborCost"
                type="number"
                min="0"
                step="0.01"
                className="form-input"
                value={settings.laborCost}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="transportPrice" className="form-label">
                Custo de Transporte (R$/km)
              </label>
              <input
                id="transportPrice"
                name="transportPrice"
                type="number"
                min="0"
                step="0.01"
                className="form-input"
                value={settings.transportPrice}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <ButtonCustom
              type="button"
              variant="outline"
              onClick={handleReset}
            >
              <RefreshCw size={16} className="mr-2" />
              Restaurar Padrões
            </ButtonCustom>
            <ButtonCustom
              type="submit"
              isLoading={isLoading}
            >
              <Save size={16} className="mr-2" />
              Salvar Configurações
            </ButtonCustom>
          </div>
        </motion.form>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
