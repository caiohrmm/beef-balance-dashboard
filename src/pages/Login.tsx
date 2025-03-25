
import React from "react";
import AuthLayout from "../components/layout/AuthLayout";
import LoginForm from "../components/auth/LoginForm";

const Login: React.FC = () => {
  return (
    <AuthLayout 
      title="Bem-vindo de volta" 
      subtitle="Acesse sua conta para continuar"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
