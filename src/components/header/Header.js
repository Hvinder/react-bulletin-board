import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  Drawer,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import { isEmptyObj } from '../../utils/utils';
import './Header.css';

const Header = (props) => {
  const loggedInState = (
    <div className="loggedInState">
      <Logout setProfile={props.setProfile} loggedOutHandler={props.loggedOutHandler}/>
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
        <Login setProfile={props.setProfile} setItems={props.setItems}/>
      ) : (
        loggedInState
      )}
    </div>
  );

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());
  }, []);

  const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: '#400CCC',
      paddingRight: '79px',
      paddingLeft: '118px',
      '@media (max-width: 900px)': {
        paddingLeft: 0,
      },
    },
    logo: {
      fontFamily: 'Redressed',
      fontWeight: 600,
      color: '#FFFEFE',
      textAlign: 'left',
    },
    menuButton: {
      fontFamily: 'Open Sans, sans-serif',
      fontWeight: 700,
      size: '18px',
      marginLeft: '38px',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    drawerContainer: {
      padding: '20px 30px',
    },
  }));

  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {AppLogo}
        {profileStatus}
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    return (
      <Toolbar>
        <IconButton
          {...{
            edge: 'start',
            color: 'inherit',
            'aria-label': 'menu',
            'aria-haspopup': 'true',
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          {...{
            anchor: 'left',
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{profileStatus}</div>
        </Drawer>
        <div>{AppLogo}</div>
      </Toolbar>
    );
  };

  const AppLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      Bulletin Board
    </Typography>
  );

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
};

export default Header;
