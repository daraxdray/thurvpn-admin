import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { adminLogin } from '../../../repository/auth';
// components
import Iconify from '../../../components/iconify';
// import { useAuth } from '../../../hooks/useAuth';
import ThurAlert from '../../../components/alert/alert';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  // const auth = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);
  // const [apiStatus, setApiStatus] = useState('');
  const emailChange = (e) => setEmail(e.target.value);
  const pwChange = (e) => setPassword(e.target.value);
  const handleClick = async () => {
    if (email != 'demo' && password != 'demo') {
      try {
        const loggedIn = await adminLogin(email, password);
        console.log('opo', from);
        setResponse(loggedIn);
      } catch (e) {
        setResponse(e);
      }
    } else {
      // auth.login({ name: 'dammy' });
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <>
      <Stack spacing={3} sx={{ my: 2 }}>
        {response && <ThurAlert severe={response.status ? 'success' : 'error'} message={response.message} />}
        <TextField name="email" label="Email address" onChange={emailChange} />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={pwChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton
        sx={{ background: 'black' }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );
}
