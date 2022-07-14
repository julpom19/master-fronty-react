import { useEffect, useState } from 'react';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordInput = ({ label, value, name, handleChange }) => {
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showError, setShowError ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState(null);
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if(!value) return;
    if(value.length < 6) {
      setShowError(true);
      setErrorMsg('Password needs to be at least 6 characters long');
    } else {
      setShowError(false);
      setErrorMsg(null);
    }
  }, [value]);
  return (
  <FormControl sx={{ marginTop: "20px"}} variant="outlined">
    <InputLabel htmlFor="outlined-adornment-password" error={showError}>{label}</InputLabel>
    <OutlinedInput
      id="outlined-adornment-password"
      type={showPassword ? 'text' : 'password'}
      value={value}
      onChange={handleChange}
      name={name}
      required
      error={showError}

      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      }
      label={label}
    />
    <Typography ml={2} variant="caption" color="error">{errorMsg}</Typography>
  </FormControl>
  );
};

export default PasswordInput;