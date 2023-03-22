import { Link, useNavigate, useRouteError } from "react-router-dom";
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export function Error() {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  console.error("Error: ", error.stack);

  return (
    <section className="error">
      <h1>Uh oh! We've got a problem.</h1>
      <p>{error?.message}</p>

      <div className="flex-md">
        <button onClick={() => navigate(-1)} className="btn btn--dark">
          <ArrowUturnLeftIcon width={20} />
          <span>Go back</span>
        </button>

        <Link to="/" className="btn btn--dark">
          <HomeIcon width={20} />
          <span>Go Home</span>
        </Link>
      </div>
    </section>
  );
}
