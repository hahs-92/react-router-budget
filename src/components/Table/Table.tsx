import { IExpense } from "../../models/expense.model";
import { ExpenseItem } from "../ExpenseItem/ExpenseItem";

interface IProps {
  expenses: IExpense[];
}

export function Table({ expenses }: IProps) {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Name", "Amount", "Date", "Budget", ""].map((i, idx) => (
              <th key={idx + i}>{i}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem expense={expense} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
