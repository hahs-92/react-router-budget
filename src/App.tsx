import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//actions
import { logoutAction } from "./actions/logout";
import { deleteBudgetAction } from "./actions/deleteBudget";
import { dashboardAction } from "./pages/Dashboard/dashboard.actions";
import { budgetActions } from "./pages/Budget/budget.actions";
import { expensesActions } from "./pages/Expenses/expenses.actions";
//loaders
import { dashboardLoader } from "./pages/Dashboard/dashboard.loader";
import { expensesLoader } from "./pages/Expenses/expenses.loader";
import { budgetLoader } from "./pages/Budget/budget.loader";
//pages
import { Main, mainLoader } from "./layouts/Main/Main";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Error } from "./pages/Error/Error";
import { Expenses } from "./pages/Expenses/Expenses";
import { Budget } from "./pages/Budget/Budget";

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
        children: [
          {
            path: "delete",
            action: deleteBudgetAction,
          },
        ],
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
