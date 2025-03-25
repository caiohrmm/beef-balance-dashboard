
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { ButtonCustom } from "../ui/button-custom";
import { useToast } from "@/hooks/use-toast";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Conta criada com sucesso",
        description: "Bem-vindo ao CaioMartinsAgroPec",
      });
      navigate("/dashboard");
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputVariants = {
    focus: { scale: 1.01, boxShadow: "0 0 0 3px rgba(92, 184, 92, 0.15)" },
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nome completo
        </label>
        <motion.input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          whileFocus="focus"
          variants={inputVariants}
          className="form-input"
          placeholder="João Silva"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <motion.input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          whileFocus="focus"
          variants={inputVariants}
          className="form-input"
          placeholder="seu@email.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Senha
        </label>
        <div className="relative">
          <motion.input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            whileFocus="focus"
            variants={inputVariants}
            className="form-input w-full pr-10"
            placeholder="••••••••"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff size={18} className="text-gray-500 hover:text-gray-700" />
            ) : (
              <Eye size={18} className="text-gray-500 hover:text-gray-700" />
            )}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label">
          Confirmar senha
        </label>
        <motion.input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
          whileFocus="focus"
          variants={inputVariants}
          className="form-input"
          placeholder="••••••••"
        />
      </div>

      <div className="flex items-center mt-4">
        <input
          id="terms"
          type="checkbox"
          required
          className="form-checkbox h-4 w-4"
        />
        <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
          Eu concordo com os{" "}
          <a href="#" className="text-agro-600 hover:text-agro-700">
            termos de serviço
          </a>{" "}
          e{" "}
          <a href="#" className="text-agro-600 hover:text-agro-700">
            política de privacidade
          </a>
        </label>
      </div>

      <ButtonCustom
        type="submit"
        className="w-full mt-6"
        isLoading={isLoading}
      >
        <UserPlus size={18} className="mr-2" />
        Criar conta
      </ButtonCustom>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-agro-600 hover:text-agro-700 font-medium">
            Entrar
          </Link>
        </p>
      </div>
    </motion.form>
  );
};

export default RegisterForm;
