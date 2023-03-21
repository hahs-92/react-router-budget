import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers/localstorage";

export async function logoutAction() {
  deleteItem("userName");
  return redirect("/");
}
