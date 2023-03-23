import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { toast } from "react-toastify";

import {
  deleteItem,
  deleteItemById,
  getAllMatchingItems,
} from "../helpers/helper";
import { IExpense } from "../models/expense.model";

export function deleteBudgetAction({ params }: LoaderFunctionArgs) {
  try {
    deleteItemById("budgets", params.id!);

    const associatedExpenses = getAllMatchingItems<IExpense>(
      "expenses",
      "budgetId",
      params.id!
    );

    associatedExpenses.forEach((expense) => {
      deleteItemById("expenses", expense.id);
    });

    toast.success("Budget deleted¡");
    return redirect("/");
  } catch (error) {
    console.error(error);
    throw new Error("There was a problem deleting your budget");
  }
}
