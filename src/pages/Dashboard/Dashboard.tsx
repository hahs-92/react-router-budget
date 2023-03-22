import { ActionFunctionArgs, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

import { AddBudgetForm } from "../../components/AddBudgetForm/AddBudgetForm";
import { AddExpenseForm } from "../../components/AddExpenseForm/AddExpenseForm";
import { Intro } from "../../components/Intro/Intro";
import { IBudget } from "../../models/budget.model";
import {
  createBudget,
  createExpense,
  fetchData,
  setItem,
  waait,
} from "../../helpers/localstorage";

// esta funcion es pasada como un loader
// en la configuracion de la ruta
// el valor de retorno puede ser accedido desde el componente
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets") as unknown as IBudget[];

  return { userName, budgets };
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
      throw new Error("There was a problem creating your budget.");
    }
  }
}

export function Dashboard() {
  const { userName, budgets } = useLoaderData() as {
    userName: string;
    budgets: IBudget[];
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
