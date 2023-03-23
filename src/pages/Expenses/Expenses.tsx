import { useLoaderData } from "react-router-dom";
import { Table } from "../../components/Table/Table";

import { fetchData } from "../../helpers/helper";
import { IExpense } from "../../models/expense.model";

export function expensesLoader() {
  const expenses = fetchData("expenses") as unknown as IExpense[];

  return { expenses };
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
