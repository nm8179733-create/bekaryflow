
export enum PaymentMode {
  CASH = 'Cash',
  UPI = 'UPI',
  BANK = 'Bank Transfer'
}

export enum FixedExpenseType {
  RENT = 'Rent',
  ELECTRICITY = 'Electricity',
  SALARY = 'Staff Salary',
  TRANSPORT = 'Transport',
  OTHER = 'Other'
}

export interface DailySale {
  id: string;
  date: string; // ISO format
  cashAmount: number;
  upiAmount: number;
  totalAmount: number;
}

export interface SupplierPayment {
  id: string;
  supplierName: string;
  date: string;
  amount: number;
  mode: PaymentMode;
  category: string;
  notes?: string;
}

export interface FixedExpense {
  id: string;
  type: FixedExpenseType;
  amount: number;
  isRecurring: boolean;
  name: string;
}

export interface AppState {
  sales: DailySale[];
  payments: SupplierPayment[];
  fixedExpenses: FixedExpense[];
  suppliers: string[];
}
