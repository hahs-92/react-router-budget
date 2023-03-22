import { Form } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

export function AddBudgetForm() {
  return (
    <article className="form-wrapper">
      <h2 className="h3">Create Budget</h2>

      <Form method="post" className="grid-sm">
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Budget Name</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button className="btn btn--dark" type="submit">
          <CurrencyDollarIcon width={20} />
          <span>Cretae Budget</span>
        </button>
      </Form>
    </article>
  );
}
