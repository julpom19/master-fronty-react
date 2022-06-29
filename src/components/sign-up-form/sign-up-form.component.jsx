import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase-store.utils';
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase-auth.utils';
import { useState } from 'react';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

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
      alert('Password confirmation error');
      return;
    }

    try {
      const { user: userAuth } = await createAuthUserWithEmailAndPassword(email, password);

      const user = {
        ...userAuth,
        displayName
      }
      const userDocRef = await createUserDocumentFromAuth(user);
      resetFormFields();
    } catch (error) {
      console.log('Error with user\'s sign up', error);
    }
  };

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
          <TextField
            label="Password"
            required
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
            variant="outlined"
            sx={{marginTop: "20px"}}
            minLength="6"
          />
          <TextField
            label="Confirm Password"
            required
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            variant="outlined"
            sx={{marginTop: "20px"}}
            minLength="6"
          />
        </Box>
        <Box sx={{marginTop: "20px", display: "flex", justifyContent: "end"}}>
          <Button variant="outlined" >
            Sign up
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default SignUpForm;