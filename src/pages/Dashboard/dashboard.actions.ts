import { ActionFunctionArgs } from "react-router-dom";
import { toast } from "react-toastify";

import {
  waait,
  setItem,
  createBudget,
  createExpense,
  deleteItemById,
} from "../../helpers/helper";

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
