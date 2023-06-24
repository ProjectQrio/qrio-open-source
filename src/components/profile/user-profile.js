
import ProfileForm from "./profile-form"

function UserProfile() {
  
async function changePasswordHandler(passwordData) {
  const response = await fetch('/api/auth/change-password', {
    method: 'PATCH',
    body: JSON.stringify(passwordData),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  });
  const data = await response.json();

  console.log(data);
}


  return (
    <div>
      <center>
        <h1>My profile</h1>
        < br />   < br />   < br />   < br />
        <h3>Change password</h3>
        <ProfileForm onChangePassword={changePasswordHandler}></ProfileForm>
      </center>
    </div>
  );
}

export default UserProfile;