
import React, { useState, useEffect } from 'react';
import { AppState, DailySale, SupplierPayment } from './types';
import { loadData, saveData } from './services/dataService';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import SalesEntry from './components/SalesEntry';
import SupplierPayments from './components/SupplierPayments';
import FixedExpenses from './components/FixedExpenses';
import Reports from './components/Reports';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(loadData());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Simplified for MVP demo

  useEffect(() => {
    saveData(state);
  }, [state]);

  const handleAddSale = (sale: DailySale) => {
    setState(prev => {
      // One entry per day rule: Replace if exists
      const existingIndex = prev.sales.findIndex(s => s.date === sale.date);
      const newSales = [...prev.sales];
      if (existingIndex >= 0) {
        newSales[existingIndex] = sale;
      } else {
        newSales.push(sale);
      }
      return { ...prev, sales: newSales };
    });
  };

  const handleAddPayment = (payment: SupplierPayment) => {
    setState(prev => {
      const newSuppliers = [...prev.suppliers];
      if (!newSuppliers.includes(payment.supplierName)) {
        newSuppliers.push(payment.supplierName);
      }
      return {
        ...prev,
        payments: [...prev.payments, payment],
        suppliers: newSuppliers
      };
    });
  };

  const handleUpdateFixedExpense = (id: string, amount: number) => {
    setState(prev => ({
      ...prev,
      fixedExpenses: prev.fixedExpenses.map(e => e.id === id ? { ...e, amount } : e)
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center text-white text-3xl mb-8 shadow-xl">
          <i className="fas fa-bread-slice"></i>
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">BakeryFlow</h1>
        <p className="text-slate-500 mb-10">Efficiently manage your bakery's growth</p>
        <button 
          onClick={() => setIsAuthenticated(true)}
          className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold shadow-lg"
        >
          CONTINUE AS OWNER
        </button>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard state={state} />;
      case 'sales': return <SalesEntry sales={state.sales} onAddSale={handleAddSale} />;
      case 'payments': return <SupplierPayments payments={state.payments} suppliers={state.suppliers} onAddPayment={handleAddPayment} />;
      case 'expenses': return <FixedExpenses expenses={state.fixedExpenses} onUpdateExpense={handleUpdateFixedExpense} />;
      case 'reports': return <Reports state={state} />;
      default: return <Dashboard state={state} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto relative bg-slate-50 border-x border-slate-100 overflow-x-hidden">
      {renderContent()}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
