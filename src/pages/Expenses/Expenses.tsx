import { useLoaderData } from "react-router-dom";

import { Table } from "../../components/Table/Table";
import { IExpense } from "../../models/expense.model";

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
