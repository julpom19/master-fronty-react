import { Alert, Box, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { signInUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase-auth.utils';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router';
import PasswordInput from '../password-input/password-input.component';
import LoadingButton from '@mui/lab/LoadingButton';

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = ({ redirectLocation }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const navigate = useNavigate();
  const [ errorMsg, setErrorMsg ] = useState(null);

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
      redirect();
    } catch (error) {
      switch(error.code) {
        case 'auth/wrong-password':
          setErrorMsg(`Password doesn't match to email`);
          break;
        case 'auth/user-not-found':
          setErrorMsg('A user with this email does not exist');
          break;
        default:
          console.error(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    redirect();
  };

  const redirect = () => {
    navigate(redirectLocation, { replace: true });
  }

  return (
    <Paper sx={{margin: "20px", padding: "20px"}}>
      <Typography variant="h6" mb={3}>Sign in with your email and password</Typography>
      <form onSubmit={submitHandler}>
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
          <PasswordInput
            label={"Password *"}
            value={password}
            handleChange={handleChange}
            name={"password"}
          />
          {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: "20px" }}>
          <LoadingButton
            variant="outlined"
            onClick={signInWithGoogle}
            sx={{marginRight: "20px"}}
            startIcon={<GoogleIcon />}
          >
            Log in with Google
          </LoadingButton>
          <LoadingButton variant="outlined" type="submit">
            Log in
          </LoadingButton>
        </Box>
      </form>
    </Paper>
  );
}

export default SignInForm;