
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { ButtonCustom } from "../ui/button-custom";
import { useToast } from "@/hooks/use-toast";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login realizado com sucesso",
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

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            className="form-checkbox h-4 w-4"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
            Lembrar-me
          </label>
        </div>
        <a href="#" className="text-sm text-agro-600 hover:text-agro-700">
          Esqueceu a senha?
        </a>
      </div>

      <ButtonCustom
        type="submit"
        className="w-full mt-6"
        isLoading={isLoading}
      >
        <LogIn size={18} className="mr-2" />
        Entrar
      </ButtonCustom>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-agro-600 hover:text-agro-700 font-medium">
            Cadastrar
          </Link>
        </p>
      </div>
    </motion.form>
  );
};

export default LoginForm;
