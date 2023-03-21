import { useLoaderData } from "react-router-dom";
import { fetchData } from "../../helpers/localstorage";

// esta funcion es pasada como un loader
// en la configuracion de la ruta
// el valor de retorno puede ser accedido desde el componente
export function dashboardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

export function Dashboard() {
  const { userName } = useLoaderData() as { userName: string };

  return (
    <div>
      <h2>{userName}</h2>
      Dashboard
    </div>
  );
}
