import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { clientId } from '../../keys/keys';

const Login = (props) => {
//   let isLoggedIn = false;
  let profileObj;

  const onSuccess = (res) => {
    // isLoggedIn = true;
    profileObj = res.profileObj;
    props.setProfile(profileObj);
    console.log('{Login Success] currentUser: ', res.profileObj);
  };

  const onFailure = (res) => {
    // isLoggedIn = false;
    profileObj = {};
    props.setProfile(profileObj);
    console.log('[Login Failed] res: ', res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
