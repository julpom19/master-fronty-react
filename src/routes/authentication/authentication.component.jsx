import './authentication.styles.scss';
import { Box, Button, Container, Typography } from '@mui/material';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { useState } from 'react';
import { useLocation } from 'react-router';

const Authentication = () => {
  const [ showSignInForm, setShowSignInForm ] = useState(true);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handeClick = () => {
    setShowSignInForm(prev => !prev);
  }

  return (
    <Container sx={{display: "flex", justifyContent: "space-around", alignItems: "start"}}>
        { showSignInForm ?
          <Box>
            <SignInForm redirectLocation={from}></SignInForm>
            <Typography textAlign="end">
              Need an account?
              <Button onClick={handeClick}>Sign up</Button>
            </Typography>
          </Box>
          :
          <Box>
            <SignUpForm redirectLocation={from}></SignUpForm>
            <Typography textAlign="end">
              Already have an account?
              <Button onClick={handeClick}>Sign in</Button>
            </Typography>
          </Box>
        }
    </Container>
  );
}

export default Authentication;