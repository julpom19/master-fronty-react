import { Avatar, Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { stringAvatar } from '../../utils/avatar.utils';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selectors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGooglePopup, signOutUser } from '../../utils/firebase/firebase-auth.utils';

const UserAvatar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const signOutHandler = async () => {
    handleCloseUserMenu();
    await signOutUser();
  };
  const signInHandler = async () => {
    await signInWithGooglePopup();
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigateToProfilePage = () => {
    handleCloseUserMenu();
    navigate('/profile');
  };
  const settings = [
    {
      title: 'Profile',
      onClickHandler: navigateToProfilePage,
    },{
      title: 'Logout',
      onClickHandler: signOutHandler,
    }];
  return (
    <Box sx={{ flexGrow: 0 }}>
      {
        currentUser ? (
          <>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                {...stringAvatar(currentUser?.displayName)}
                sx={{
                  backgroundColor: 'lightBlue', //TODO: color
                  padding: '5px'
                }}
              />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={setting.onClickHandler}>
                  <Typography textAlign="center">{setting.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Button
            variant="outlined"
            onClick={signInHandler}>
            SIGN IN
          </Button>
        )
      }


    </Box>
  );
}

export default UserAvatar;