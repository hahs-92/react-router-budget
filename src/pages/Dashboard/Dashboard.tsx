import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

import { AddBudgetForm } from "../../components/AddBudgetForm/AddBudgetForm";
import { AddExpenseForm } from "../../components/AddExpenseForm/AddExpenseForm";
import { Intro } from "../../components/Intro/Intro";
import { BudgetItem } from "../../components/BudgetItem/BudgetItem";
import { Table } from "../../components/Table/Table";
import { IBudget } from "../../models/budget.model";
import { IExpense } from "../../models/expense.model";
import { deleteItemById } from "../../helpers/helper";
import {
  createBudget,
  createExpense,
  fetchData,
  setItem,
  waait,
} from "../../helpers/helper";

// esta funcion es pasada como un loader
// en la configuracion de la ruta
// el valor de retorno puede ser accedido desde el componente
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets") as unknown as IBudget[];
  const expenses = fetchData("expenses") as unknown as IExpense[];

  return { userName, budgets, expenses };
}

//action
export async function dashboardAction({ request }: ActionFunctionArgs) {
  await waait();

  const data = await request.formData();
  // console.log({ data, request });

  // const userName = data.get("userName");
  // const formData = Object.fromEntries(data);
  const { _action, ...values } = Object.fromEntries(data);

  //userName es el nombre del input en el componente Intro
  // _action contiene el valor del input tipo hidden agregado en Intro
  // de esta manera sabemos que tipo de action es
  if (_action === "newUser") {
    try {
      setItem("userName", values.userName as string);
      // se debe devolver algo en las actions
      return toast.success(`Welcome, ${values.userName}`);
    } catch (error) {
      // este error seria capturado en el component Error
      throw new Error("There was a problem creating your account.");
    }
  }

  // esta action es lanzada desde AddBudgetForm
  if (_action === "createBudget") {
    try {
      const budgetName = values.newBudget as string;
      const budgetAmount = Number(values.newBudgetAmount);
      createBudget(budgetName, budgetAmount);
      return toast.success("Budget Created!");
    } catch (error) {
      throw new Error("There was a problem creating your budget.");
    }
  }

  // esta action es lanzada desde AddExpenseForm
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
