import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { signInUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase-auth.utils';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router';

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      ...formFields,
      [name]: value
    });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await signInUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('Email not registered');
          break;
        default:
          console.error(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    navigate('/');
  };

  return (
    <Paper sx={{margin: "20px", padding: "20px"}}>
      <Typography variant="h6" mb={3}>Sign in with your email and password</Typography>
      <form>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            label="Email"
            required
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Password"
            required
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
            variant="outlined"
            sx={{marginTop: "20px"}}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', marginTop: "20px" }}>
          <Button
            variant="outlined"
            onClick={signInWithGoogle}
            sx={{marginRight: "20px"}}
            startIcon={<GoogleIcon />}
          >
            Log in with Google
          </Button>
          <Button variant="outlined">
            Log in
          </Button>
        </Box>

      </form>
    </Paper>
  );
}

export default SignInForm;