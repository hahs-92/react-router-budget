import { Outlet, useLoaderData } from "react-router-dom";

import { Nav } from "../../components/Nav/Nav";
import { fetchData } from "../../helpers/helper";
import wave from "../../assets/wave.svg";

// esta funcion es pasada como un loader
// en la configuracion de la ruta
// el valor de retorno puede ser accedido desde el componente
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

export function Main() {
  const { userName } = useLoaderData() as { userName: string };

  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="wave" />
    </div>
  );
}
