import React from 'react';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import './Header.css';

const Header = (props) => {
  const isEmptyObj = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const loggedInState = (
    <div className="loggedInState">
      <Logout setProfile={props.setProfile} />
      <img
        src={props.profile.imageUrl}
        className="profile-img"
        alt={props.profile.givenName}
      />
    </div>
  );

  const profileStatus = (
    <div className="profileStatus">
      {isEmptyObj(props.profile) ? (
        <Login setProfile={props.setProfile} />
      ) : (
        loggedInState
      )}
    </div>
  );
  return profileStatus;
};

export default Header;
