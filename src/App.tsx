import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Main, mainLoader } from "./layouts/Main/Main";
import { logoutAction } from "./actions/logout";

//pages
import { Dashboard, dashboardLoader } from "./pages/Dashboard/Dashboard";
import { Error } from "./pages/Error/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: "/",
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      {
        path: "/about",
        element: <p>About</p>,
      },
      {
        path: "/logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
