import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { clientId } from '../../utils/keys';
import './Logout.css';

const Logout = (props) => {
  const onSuccess = () => {
    props.setProfile({});
    alert('Successfully logged out!');
  };

  return (
    <div className="logout">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;
