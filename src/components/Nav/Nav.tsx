import { Form, NavLink } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

import logomark from "../../assets/logomark.svg";

interface INavProps {
  userName: string;
}

export function Nav({ userName }: INavProps) {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to Home">
        <img src={logomark} height={30} alt="mark" />
        <span>HomeBudget</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          // esta action es capturada en la conf de rutas
          action="/logout" // ruta
          onSubmit={(event) => {
            if (!confirm("Delete user and all data?")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>Delete User</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
}
