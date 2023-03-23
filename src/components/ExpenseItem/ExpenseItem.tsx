import { IExpense } from "../../models/expense.model";
import { formatCurrency, formatDateToLocalString } from "../../helpers/helper";

interface IProps {
  expense: IExpense;
}

export function ExpenseItem({ expense }: IProps) {
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocalString(expense.createdAt)}</td>
    </>
  );
}
