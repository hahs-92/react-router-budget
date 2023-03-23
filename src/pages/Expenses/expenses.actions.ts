import { ActionFunctionArgs } from "react-router-dom";
import { toast } from "react-toastify";

import { waait, deleteItemById } from "../../helpers/helper";

export async function expensesActions({ request }: ActionFunctionArgs) {
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
}
