import { useState } from 'react';
import { useRouter } from 'next/router';


const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [age, setAge] = useState('');

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    // Assuming you have a function `registerUser` to call your backend and register the user
    registerUser(username, email, password)
      .then(() => {
        setMessage('Thank you for registering!');
        // Assuming you have a function `loginUser` to login user after registration
        loginUser(username, password)
          .then(() => {
            router.push('/');  // Redirects the user to the homepage
          });
      });
  };

  return (
<div>
<br />
<br />
<br />
    <center>
    <form className="register-form" onSubmit={handleSubmit}>
    <h2 className="form-title">Register</h2> 
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
      </label>

      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>

      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>

      <label>
        Confirm Password:
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
      </label>

      <button type="submit">Register</button>
            {message && <p>{message}</p>}
    </form>
    </center>
    </div>
  );
};

export default RegistrationForm;