import { ActionFunctionArgs, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

import { AddBudgetForm } from "../../components/AddBudgetForm/AddBudgetForm";
import { Intro } from "../../components/Intro/Intro";
import {
  createBudget,
  fetchData,
  setItem,
  waait,
} from "../../helpers/localstorage";

// esta funcion es pasada como un loader
// en la configuracion de la ruta
// el valor de retorno puede ser accedido desde el componente
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgtes = fetchData("budgtes");
  return { userName, budgtes };
}

//action
export async function dashboardAction({ request }: ActionFunctionArgs) {
  await waait();

  const data = await request.formData();
  // console.log({ data, request });

  // const userName = data.get("userName");
  // const formData = Object.fromEntries(data);
  const { _action, ...values } = Object.fromEntries(data);

  //userName es el nombre del input en el componente Intro
  // _action contiene el valor del input tipo hidden agregado en Intro
  // de esta manera sabemos que tipo de action es
  if (_action === "newUser") {
    try {
      setItem("userName", values.userName as string);
      // se debe devolver algo en las actions
      return toast.success(`Welcome, ${values.userName}`);
    } catch (error) {
      // este error seria capturado en el component Error
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createBudget") {
    try {
      const budgetName = values.newBudget as string;
      const budgetAmount = Number(values.newBudgetAmount);
      createBudget(budgetName, budgetAmount);
      return toast.success("Budget Created!");
    } catch (error) {
      throw new Error("There was a problem creating your budget.");
    }
  }
}

export function Dashboard() {
  const { userName, budgets } = useLoaderData() as {
    userName: string;
    budgets: string;
  };

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="acccent">{userName}</span>
          </h1>

          <div className="grid-sm">
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}
