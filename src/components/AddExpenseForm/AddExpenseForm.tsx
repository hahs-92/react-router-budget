import { useRef, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

import { IBudget } from "../../models/budget.model";

interface IProps {
  budgets: IBudget[];
}

export function AddExpenseForm({ budgets }: IProps) {
  const fetcher = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
      focusRef.current?.focus();
    }
  }, [isSubmitting]);
  return (
    <section className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
        </span>{" "}
        Expense
      </h2>

      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <article className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              ref={focusRef}
              placeholder="e.g., Coffee"
              required
            />
          </article>
          <article className="grid-xs">
            <label htmlFor="newExpenseAmount">Expense Amount</label>
            <input
              type="number"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., 3.50"
              inputMode="decimal"
              step="0.01"
              required
            />
          </article>
        </div>

        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          {/* el value del option es el budget.id, el cual se utiliza
          para guardar el expense */}
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {budgets
              .sort((a, b) => Number(a.createdAt) - Number(b.createdAt))
              .map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
          </select>
        </div>

        <input type="hidden" name="_action" value="createExpense" />
        <button disabled={isSubmitting} className="btn btn--dark" type="submit">
          {isSubmitting ? (
            <span>Loading...</span>
          ) : (
            <>
              <PlusCircleIcon width={20} />
              <span>Add Expense</span>
            </>
          )}
        </button>
      </fetcher.Form>
    </section>
  );
}
