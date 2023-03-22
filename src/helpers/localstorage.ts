const generateRandomColor = () => {
  const existBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existBudgetLength * 34} 65% 50%`;
};

export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 2000));

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
