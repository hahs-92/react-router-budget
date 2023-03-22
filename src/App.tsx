import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Main, mainLoader } from "./layouts/Main/Main";
import { logoutAction } from "./actions/logout";

//pages
import {
  Dashboard,
  dashboardAction,
  dashboardLoader,
} from "./pages/Dashboard/Dashboard";
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
        // esta action es accionada desde Intro
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "/about",
        element: <p>About</p>,
      },
      {
        path: "/logout",
        // esta action es accionada desde el componete Nav
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
