import { useState, useRef } from "react";
import classes from "./auth-form-his.module.css";
import { signIn } from "next-auth/react";
import {useRouter} from 'next/router';

async function createUser(username, email, password, dob) {
  const dataToSend = { username, email, password, dob };
  console.log(dataToSend);

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

function AuthForm() {
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const dobInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: add validation

    if (isLogin) {
      
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      console.log(result);

      if (!result.error) {
        
        router.replace("/profile");
        
      }
    } else {
      const enteredDOB = dobInputRef.current.value;
      const enteredUsername = usernameInputRef.current.value;
      try {
        const result = await createUser(
          enteredUsername,
          enteredEmail,
          enteredPassword,
          enteredDOB
        );
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
      {!isLogin && (
        <div className={classes.control}>
          <label htmlFor="username">Public Username</label>
          <input type="text" id="username" required ref={usernameInputRef} />
        </div>
      )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" required ref={dobInputRef} />
          </div>
        )}
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
