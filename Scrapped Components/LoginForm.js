import React, { useState } from "react";
import Router from 'next/router';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Here is where you would handle your form submission
    // This typically involves sending a request to your server with the username and password
    // For this example, we'll just print them to the console

    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    // Simulating successful login by redirecting to home page
    Router.push('/');  // update with your home page route
  };

  return (
    <center><br /><br /><br />
    <form className="register-form" onSubmit={handleSubmit}>
    <h2 className="form-title">Log In</h2> 
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <button type="submit" className="button">Log in</button>
    </form>
    </center>
  );
};

export default LoginForm;
