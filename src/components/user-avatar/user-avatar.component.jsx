import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../../store/user/user.selectors';

import { signOutUser } from '../../utils/firebase/firebase-auth.utils';
import { stringAvatar } from '../../utils/avatar.utils';

import { Avatar, Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';

const UserAvatar = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const signOutHandler = async () => {
    handleCloseUserMenu();
    await signOutUser();
  };
  const signInHandler = async () => {
    navigate('/auth');
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigateToQuizResultsPage = () => {
    handleCloseUserMenu();
    navigate('/quiz-results');
  };
  const settings = [
    {
      title: 'Quiz Results',
      onClickHandler: navigateToQuizResultsPage,
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
            LOG IN
          </Button>
        )
      }
    </Box>
  );
}

export default UserAvatar;