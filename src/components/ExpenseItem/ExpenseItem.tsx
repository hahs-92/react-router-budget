import { ActionFunctionArgs, Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

import { IExpense } from "../../models/expense.model";
import {
  deleteItemById,
  formatCurrency,
  formatDateToLocalString,
  getAllMatchingItems,
  waait,
} from "../../helpers/helper";
import { IBudget } from "../../models/budget.model";

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

interface IProps {
  expense: IExpense;
}

export function ExpenseItem({ expense }: IProps) {
  const fetcher = useFetcher();
  const budget = getAllMatchingItems(
    "budgets",
    "id",
    expense.budgetId
  )[0] as IBudget;

  console.log(budget);
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocalString(expense.createdAt)}</td>
      <td>
        {
          <Link style={{ "--accent": budget.color }} to={`${budget.id}`}>
            {budget.name}
          </Link>
        }
      </td>
      <td>
        <button>
          <fetcher.Form method="post">
            <input type="hidden" name="_action" value="deleteExpense" />
            <input type="hidden" name="expenseId" value={expense.id} />
            <button
              type="submit"
              className="btn btn--warning"
              aria-label={`Delete ${expense.name} expense`}
            >
              <TrashIcon width="20" />
            </button>
          </fetcher.Form>
        </button>
      </td>
    </>
  );
}
