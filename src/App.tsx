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
import { Expenses, expensesLoader } from "./pages/Expenses/Expenses";
import { expensesActions } from "./components/ExpenseItem/ExpenseItem";

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
