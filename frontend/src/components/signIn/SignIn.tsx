import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import {
  styled,
} from '@mui/material/styles';

import { Admin } from '../../models/Admin';

import * as user_api from '../../network/user_api';
import {useForm}  from "react-hook-form";
import { NotFoundHttpError, UnautorizedHttpError } from '../../errors/http-errors';
import { Alert } from '@mui/material';
import { LoginCredentials } from '../../network/user_api';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 20,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

interface SignInProps {
  onHide : () => void;
  onLoginSuccessfully : (user : Admin) => void;
}

export default function SignIn(props: SignInProps) {
  const [errorText, setErrorText] = React.useState<string|null>(null);
  const [emailError, ] = React.useState(false);
  const [emailErrorMessage, ] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [, setOpen] = React.useState(false);

  const {register, handleSubmit, reset, formState: {isSubmitting}} = useForm<LoginCredentials>();

  const handleClickOpen = () => {
    setOpen(true);
  };



  const onSubmit = async (loginForm : LoginCredentials) => {
    console.log(loginForm);
    if (!validateInputs()) {
      return;
    }
    try {
      const user = await user_api.loginUser(loginForm);
      
      props.onLoginSuccessfully(user);
      reset()
    } catch (error) {
      if (error instanceof UnautorizedHttpError) {
        setErrorText(error.message);
      }
      else if (error instanceof NotFoundHttpError) {
        setErrorText(error.message);
      }
      else {
        alert(error);
      }
      console.error('Error at log in', error);
      
    }
  };

  const validateInputs = () => {
    const password = document.getElementById('password-login') as HTMLInputElement;

    let isValid = true;

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
        
        <SignInContainer direction="column" justifyContent="space-between">
          {
            errorText && 
            <Alert variant="outlined" severity="error" >{errorText}</Alert>
          }
          <Card variant="outlined">
            
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Log in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="adminName">Admin Name</FormLabel>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="adminName"
                  type="name"
                  placeholder="adminName"
                  
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  
                  sx={{ ariaLabel: 'email' }}
                  {...register("adminName", {required : true})}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Link
                    component="button"
                    onClick={handleClickOpen}
                    variant="body2"
                    sx={{ alignSelf: 'baseline' }}
                  >
                    Forgot your password?
                  </Link>
                </Box>
                <TextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  placeholder="••••••"
                  type="password"
                  id="password-login"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? 'error' : 'primary'}
                  {...register("password", {required : true})}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
              >
                Log in
              </Button>
              <Typography sx={{ textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <span>
                  <Link
                    href="/signup"
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                  >
                    Sign up
                  </Link>
                </span>
              </Typography>
            </Box>
            <Divider>or</Divider>
            
          </Card>
        </SignInContainer>
  );
}
