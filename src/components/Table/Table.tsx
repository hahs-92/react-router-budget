import { IExpense } from "../../models/expense.model";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem";

interface IProps {
  expenses: IExpense[];
  showBudget?: boolean;
}

export function Table({ expenses, showBudget = true }: IProps) {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Name", "Amount", "Date", showBudget ? "Budget" : "", ""].map(
              (i, idx) => (
                <th key={idx + i}>{i}</th>
              )
            )}
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem expense={expense} showBudget={showBudget} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
