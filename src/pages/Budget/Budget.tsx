import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import { toast } from "react-toastify";

import { AddExpenseForm } from "../../components/AddExpenseForm/AddExpenseForm";
import { BudgetItem } from "../../components/BudgetItem/BudgetItem";
import { Table } from "../../components/Table/Table";
import {
  createExpense,
  deleteItemById,
  getAllMatchingItems,
  waait,
} from "../../helpers/helper";
import { IBudget } from "../../models/budget.model";
import { IExpense } from "../../models/expense.model";

export async function budgetLoader({ params }: LoaderFunctionArgs) {
  const budget = await getAllMatchingItems<IBudget>(
    "budgets",
    "id",
    params?.id!
  )[0];

  const expenses = await getAllMatchingItems<IExpense>(
    "expenses",
    "budgetId",
    params?.id!
  );

  if (!budget) {
    throw new Error("The budget you are trying to find does not exist");
  }

  return { budget, expenses };
}

export async function budgetActions({ request }: ActionFunctionArgs) {
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
}

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
