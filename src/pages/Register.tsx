
import React from "react";
import AuthLayout from "../components/layout/AuthLayout";
import RegisterForm from "../components/auth/RegisterForm";

const Register: React.FC = () => {
  return (
    <AuthLayout 
      title="Criar uma conta" 
      subtitle="Registre-se para começar a usar o sistema"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
