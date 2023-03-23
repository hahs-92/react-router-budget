import { fetchData } from "../../helpers/helper";
import { IBudget } from "../../models/budget.model";
import { IExpense } from "../../models/expense.model";

// esta funcion es pasada como un loader
// en la configuracion de la ruta
// el valor de retorno puede ser accedido desde el componente
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets") as unknown as IBudget[];
  const expenses = fetchData("expenses") as unknown as IExpense[];

  return { userName, budgets, expenses };
}
