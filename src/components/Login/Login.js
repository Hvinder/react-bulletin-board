import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { clientId } from '../../utils/keys';
import { refreshTokenSetup } from '../../utils/refreshToken';

const axios = require('axios').default;

const Login = (props) => {
  const onSuccess = (res) => {
    props.setProfile(res.profileObj);
    console.log('{Login Success] currentUser: ', res.profileObj);
    axios
      .post('http://localhost:4200/user', {
        email: res.profileObj.email,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    props.setProfile({});
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
