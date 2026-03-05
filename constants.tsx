
import React from 'react';

export const CURRENCY_SYMBOL = '₹';

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Bread: <i className="fas fa-bread-slice text-amber-600"></i>,
  Biscuits: <i className="fas fa-cookie text-amber-700"></i>,
  Snacks: <i className="fas fa-hamburger text-orange-500"></i>,
  Cakes: <i className="fas fa-birthday-cake text-pink-500"></i>,
  Dairy: <i className="fas fa-cheese text-yellow-500"></i>,
  Other: <i className="fas fa-box text-slate-400"></i>,
};

export const EXPENSE_ICONS: Record<string, React.ReactNode> = {
  Rent: <i className="fas fa-home text-blue-500"></i>,
  Electricity: <i className="fas fa-bolt text-yellow-400"></i>,
  'Staff Salary': <i className="fas fa-users text-green-500"></i>,
  Transport: <i className="fas fa-truck text-indigo-500"></i>,
  Other: <i className="fas fa-ellipsis-h text-slate-400"></i>,
};
