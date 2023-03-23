import { ActionFunctionArgs, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

import { Table } from "../../components/Table/Table";
import { deleteItemById, fetchData, waait } from "../../helpers/helper";
import { IExpense } from "../../models/expense.model";

export function expensesLoader() {
  const expenses = fetchData("expenses") as unknown as IExpense[];
  return { expenses };
}

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

export function Expenses() {
  const { expenses } = useLoaderData() as { expenses: IExpense[] };
  return (
    <section className="grid-lg">
      <h1>All Expenses</h1>

      {expenses && expenses.length > 0 ? (
        <article className="grid-md">
          <h2>
            Recent Expenses <small>{expenses.length} total.</small>
          </h2>

          <Table expenses={expenses} />
        </article>
      ) : (
        <p>No Expenses to show.</p>
      )}
    </section>
  );
}
