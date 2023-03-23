import { ActionFunctionArgs } from "react-router-dom";
import { toast } from "react-toastify";

import { waait, deleteItemById, createExpense } from "../../helpers/helper";

export async function budgetActions({ request }: ActionFunctionArgs) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  // esta action es lanzada desde ExpenseItem
  if (_action === "deleteExpense") {
    try {
      // este valor se envia desde ExpenseItem
      const expenseId = values.expenseId as string;
      deleteItemById("expenses", expenseId);
      return toast.success("Expense Deleted!");
    } catch (error) {
      throw new Error("There was a problem deleting your expense.");
    }
  }

  if (_action === "createExpense") {
    try {
      const expenseName = values.newExpense as string;
      const expenseAmount = Number(values.newExpenseAmount);
      const budgetId = values.newExpenseBudget as string;
      createExpense(expenseName, expenseAmount, budgetId);
      return toast.success("Expense Created!");
    } catch (error) {
      throw new Error("There was a problem creating your expense.");
    }
  }
}
