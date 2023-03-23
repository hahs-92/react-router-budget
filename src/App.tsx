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
import {
  Expenses,
  expensesActions,
  expensesLoader,
} from "./pages/Expenses/Expenses";
import { Budget, budgetActions, budgetLoader } from "./pages/Budget/Budget";

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
        path: "/budget/:id",
        element: <Budget />,
        loader: budgetLoader,
        action: budgetActions,
        errorElement: <Error />,
      },
      {
        path: "/expenses",
        element: <Expenses />,
        loader: expensesLoader,
        action: expensesActions,
        errorElement: <Error />,
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
