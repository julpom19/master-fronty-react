import { Link, Outlet } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
} from '@mui/material';
import logo from '../../assets/logo-master-fronty.png';
import UserAvatar from '../../components/user-avatar/user-avatar.component';
import HeaderNavigation from '../../components/header-navigation/header-navigation.component';

import './header.styles.scss';

const Header = () => {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            backgroundColor: 'white' //TODO: color
          }}
        >
          <Link to="/">
            <img src={logo} alt="logo" width="100"/>
          </Link>
          <HeaderNavigation />
          <UserAvatar />
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Header;