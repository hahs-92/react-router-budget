import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteItem } from "../helpers/helper";

export async function logoutAction() {
  deleteItem("userName");
  deleteItem("budgets");
  deleteItem("expenses");

  toast.success("You have deleted your account¡");
  return redirect("/");
}
