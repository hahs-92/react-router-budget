import { ActionFunctionArgs, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { Intro } from "../../components/Nav/Intro/Intro";
import { fetchData, setItem } from "../../helpers/localstorage";

// esta funcion es pasada como un loader
// en la configuracion de la ruta
// el valor de retorno puede ser accedido desde el componente
export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

//action
export async function dashboardAction({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  console.log({ data, request });

  // const userName = data.get("userName");
  const formData = Object.fromEntries(data);

  //userName es el nombre del input en el componente Intro

  try {
    setItem("userName", formData.userName as string);
    // se debe devolver algo en las actions
    return toast.success(`Welcome, ${formData.userName}`);
  } catch (error) {
    // este error seria capturado en el component Error
    throw new Error("There was a problem creating your account.");
  }
}

export function Dashboard() {
  const { userName } = useLoaderData() as { userName: string };

  return <div>{userName ? <p>{userName}</p> : <Intro />}</div>;
}
