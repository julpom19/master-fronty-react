import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material';
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase-store.utils';
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase-auth.utils';
import { useCallback, useState } from 'react';
import PasswordInput from '../password-input/password-input.component';
import { useNavigate } from 'react-router';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = ({ redirectLocation }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const [ errorMsg, setErrorMsg ] = useState(null);
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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      setErrorMsg('Password confirmation error');
      return;
    }

    try {
      const { user: userAuth } = await createAuthUserWithEmailAndPassword(email, password);

      const user = {
        ...userAuth,
        displayName
      }
      await createUserDocumentFromAuth(user);
      redirect();
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          setErrorMsg('This email is already in use');
          break;
        default:
          setErrorMsg('Can not register user. Please, try later');
      }
      console.log('Error with user\'s sign up', error);
    }
  };

  const redirect = () => {
    navigate(redirectLocation, { replace: true });
  }

  return (
    <Paper sx={{margin: "20px", padding: "20px"}}>
      <Typography variant="h6" mb={3}>Sign up with your email and password</Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            label="Display name"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
            variant="outlined"
          />
          <TextField
            label="Email"
            required
            type="email"
            value={email}
            name="email"
            onChange={handleChange}
            variant="outlined"
            sx={{marginTop: "20px"}}
          />
          <PasswordInput
          label={"Password *"}
          value={password}
          handleChange={handleChange}
          name={"password"}
          />
          <PasswordInput
            label={"Confirm Password *"}
            value={confirmPassword}
            handleChange={handleChange}
            name={"confirmPassword"}
          />
          {!!errorMsg && <Alert severity="error" sx={{marginTop: "10px"}}>{errorMsg}</Alert>}
        </Box>
        <Box sx={{marginTop: "20px", display: "flex", justifyContent: "end"}}>
          <Button variant="outlined" type="submit">
            Sign up
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default SignUpForm;