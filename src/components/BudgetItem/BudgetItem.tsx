import { IBudget } from "../../models/budget.model";
import {
  formatCurrency,
  calculateExpenseByBudget,
  formatPercentage,
} from "../../helpers/helper";
import { Form, Link } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

interface IProps {
  budget: IBudget;
  showDelete?: boolean;
}

export function BudgetItem({ budget, showDelete = false }: IProps) {
  const { id, name, amount, color } = budget;
  const spent = calculateExpenseByBudget(id);

  return (
    <article className="budget" style={{ "--accent": color }}>
      <section className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </section>

      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>

      <section className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </section>

      {showDelete ? (
        <Form
          method="post"
          action="delete"
          onSubmit={(event) => {
            if (!confirm("Are you sure you want to delete this budget?")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn">
            <span>Delete Budget</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      ) : (
        <div className="flex-sm">
          <Link className="btn" to={`budget/${id}`}>
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </article>
  );
}
