import { fetchData } from "../../helpers/helper";
import { IExpense } from "../../models/expense.model";

export function expensesLoader() {
  const expenses = fetchData("expenses") as unknown as IExpense[];
  return { expenses };
}
