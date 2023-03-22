export interface IExpense {
  id: string;
  name: string;
  amount: number;
  createdAt: Date;
  budgetId: string;
}
