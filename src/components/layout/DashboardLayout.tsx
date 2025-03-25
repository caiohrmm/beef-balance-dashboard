
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart4, 
  Home, 
  Plus, 
  DollarSign, 
  FileText, 
  Settings, 
  Menu, 
  X, 
  LogOut, 
  ChevronRight 
} from "lucide-react";
import { ButtonCustom } from "../button-custom";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Adicionar Lote", path: "/add-batch", icon: Plus },
    { name: "Custos", path: "/cost-management", icon: DollarSign },
    { name: "Relatórios", path: "/reports", icon: FileText },
    { name: "Configurações", path: "/settings", icon: Settings },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 shadow-sm h-full flex flex-col"
          >
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gradient">AgroPec</h1>
                <button 
                  onClick={toggleSidebar} 
                  className="btn-icon lg:hidden"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <nav className="flex-grow p-5 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2.5 rounded-md transition-all group ${
                    location.pathname === item.path
                      ? "bg-secondary text-primary-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-primary-600"
                  }`}
                >
                  <item.icon 
                    size={18} 
                    className={`mr-3 ${
                      location.pathname === item.path
                        ? "text-primary-600"
                        : "text-gray-500 group-hover:text-primary-500"
                    }`}
                  />
                  <span>{item.name}</span>
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 w-1 h-8 bg-primary rounded-r"
                    />
                  )}
                </Link>
              ))}
            </nav>
            <div className="p-5 border-t border-gray-100">
              <ButtonCustom
                variant="outline"
                className="w-full justify-start"
                onClick={() => {/* Handle logout */}}
              >
                <LogOut size={18} className="mr-2" />
                <span>Sair</span>
              </ButtonCustom>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className={`flex-1 transition-all ${isSidebarOpen ? "lg:ml-64" : "ml-0"}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar} 
                className="btn-icon mr-4"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
            </div>
            <div className="flex items-center gap-4">
              <ButtonCustom variant="default" size="sm">
                <Plus size={16} className="mr-2" />
                Novo Lote
              </ButtonCustom>
            </div>
          </div>
        </header>

        {/* Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="p-4 sm:p-6 lg:p-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;
