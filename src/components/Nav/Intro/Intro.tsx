import { Form } from "react-router-dom";
import { UserPlusIcon } from "@heroicons/react/24/solid";

import ilustration from "../../../assets/illustration.jpg";

export function Intro() {
  return (
    <section className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          journey today.
        </p>

        <Form method="post">
          <input
            type="text"
            name="userName"
            placeholder="What is your name?"
            required
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={ilustration} alt="Person with money" />
    </section>
  );
}
