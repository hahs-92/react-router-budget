import { Link, useLoaderData } from "react-router-dom";

import { AddBudgetForm } from "../../components/AddBudgetForm/AddBudgetForm";
import { AddExpenseForm } from "../../components/AddExpenseForm/AddExpenseForm";
import { Intro } from "../../components/Intro/Intro";
import { BudgetItem } from "../../components/BudgetItem/BudgetItem";
import { Table } from "../../components/Table/Table";
import { IBudget } from "../../models/budget.model";
import { IExpense } from "../../models/expense.model";

export function Dashboard() {
  const { userName, budgets, expenses } = useLoaderData() as {
    userName: string;
    budgets: IBudget[];
    expenses: IExpense[];
  };

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>

          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>

                <h2>Existing Budgets</h2>
                <section className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </section>

                {expenses && expenses.length > 0 && (
                  <article className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort(
                          (a, b) => Number(b.createdAt) - Number(a.createdAt)
                        )
                        .slice(0, 8)}
                    />

                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        View all Expenses
                      </Link>
                    )}
                  </article>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal bundgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}
