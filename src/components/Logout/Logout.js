import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { clientId } from '../../keys/keys';

const Logout = (props) => {
  const onSuccess = () => {
    props.setProfile({});
    alert('Successfully logged out!');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;
