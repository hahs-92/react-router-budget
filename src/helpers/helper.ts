import { IExpense } from "../models/expense.model";

const generateRandomColor = () => {
  const existBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existBudgetLength * 34} 65% 50%`;
};

export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

export const fetchData = (key: string): string | null => {
  return JSON.parse(localStorage.getItem(key)!);
};

export const deleteItem = (key: string) => {
  localStorage.removeItem(key);
};

export const setItem = (key: string, value: string | object) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const createBudget = (name: string, amount: number) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: amount,
    color: generateRandomColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];
  return setItem("budgets", [...existingBudgets, newItem]);
};

export const createExpense = (
  name: string,
  amount: number,
  budgetId: string
) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: amount,
    budgetId: budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];
  return setItem("expenses", [...existingExpenses, newItem]);
};

export const formatCurrency = (amt: number) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

export const calculateExpenseByBudget = (budgetId: string) => {
  const expenses = (fetchData("expenses") ?? []) as IExpense[];

  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) {
      return acc;
    }

    return (acc += expense.amount);
  }, 0);

  return budgetSpent;
};

export const formatPercentage = (amt: number) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatDateToLocalString = (epoch: Date) => {
  return new Date(epoch).toLocaleDateString();
};
