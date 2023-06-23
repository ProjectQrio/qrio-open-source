import { useRef } from 'react';
import classes from './profile-form.module.css';
import { getSession } from 'next-auth/react'



function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  // {session ? <p>You are logged in as {session.user.email}.</p> : <p>You are not logged in.</p>}

  function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    //optional: check if values are valid

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
  }
  );
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
