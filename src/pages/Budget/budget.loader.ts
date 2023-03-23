import { LoaderFunctionArgs } from "react-router-dom";

import { getAllMatchingItems } from "../../helpers/helper";
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
