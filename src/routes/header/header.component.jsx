import './header.styles.scss';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
} from '@mui/material';
import logo from '../../assets/logo-master-fronty.png';
import UserAvatar from '../../components/user-avatar/user-avatar.component';

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
            <img src={logo} width="100"/>
          </Link>
          <UserAvatar/>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Header;