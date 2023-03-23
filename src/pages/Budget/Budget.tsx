import { useLoaderData } from "react-router-dom";

import { AddExpenseForm } from "../../components/AddExpenseForm/AddExpenseForm";
import { BudgetItem } from "../../components/BudgetItem/BudgetItem";
import { Table } from "../../components/Table/Table";
import { IBudget } from "../../models/budget.model";
import { IExpense } from "../../models/expense.model";

export function Budget() {
  const { budget, expenses } = useLoaderData() as {
    budget: IBudget;
    expenses: IExpense[];
  };

  return (
    <section style={{ "--accent": budget.color }} className="grid-lg">
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>

      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>

      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name} Expenses</span>
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </section>
  );
}
