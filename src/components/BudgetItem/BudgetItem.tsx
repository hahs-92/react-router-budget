import { IBudget } from "../../models/budget.model";
import {
  formatCurrency,
  calculateExpenseByBudget,
  formatPercentage,
} from "../../helpers/helper";

interface IProps {
  budget: IBudget;
}

export function BudgetItem({ budget }: IProps) {
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
        <small>{formatCurrency(amount - spent)} spent</small>
      </section>
    </article>
  );
}
