import React from 'react';
import { GoogleLogout } from 'react-google-login';
import './Logout.css';

// Add your Google Client ID here
// I've added it using .env file in root but you can use any other method
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Logout = (props) => {
  const onSuccess = () => {
    props.setProfile({});
    props.loggedOutHandler();
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
