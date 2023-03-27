import { useState } from 'react';
import {
  useNavigate,
  useLocation,
} from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Button, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { adminLogin, getUserData } from '../../../repository/auth';
// components
import Iconify from '../../../components/iconify';
import { useDispatch } from 'react-redux';
import { loginUserIn } from '../../../store/slice/authSlice'
import ThurAlert from '../../../components/alert/alert';
import { useQuery } from '@tanstack/react-query';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  // const auth = useSelector((state) => state.auth.value);
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname || '/';
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [sessionMsg,setSessionMsg] = useState('Checking sessions')
  const [enabled, setEnabled] = useState(true)
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);
  // const [apiStatus, setApiStatus] = useState('');
  const emailChange = (e) => setEmail(e.target.value);
  const pwChange = (e) => setPassword(e.target.value);
  const handleClick = async () => {
    if (!email || !password) {
      !email && setResponse({ message: 'Please provide a valid email', status: false });
      !password && setResponse({ message: 'Please provide a valid password', status: false });
      return;
    }
    setEnabled(false)
    try {
      const loggedIn = await adminLogin(email, password);
      if (loggedIn.status) {
        dispatch(loginUserIn(loggedIn.data))
        navigate('/dashboard/app', { replace: true });

      }
      setResponse(loggedIn);
    } catch (e) {
      setResponse(e);
      console.log(from)
      setEnabled(true)
    }

  };

  const setDemos = () => {
    setEmail('demo@thursvpn.com');
    setPassword('Aa@12345');
  };


 useQuery(['fetchUser'],getUserData,{
    onSuccess:(res)=>{
      dispatch(loginUserIn({user: res}));
      setSessionMsg('Session is Active, Redirecting in 2sec')
      setTimeout(()=>{
        navigate('/dashboard/app', { replace: true });
      },2000)
    },
    onError:(error)=>{
      console.debug(error);
      setSessionMsg('Session expired, please login')
    }
  })
  


  return (
    <>
      <Stack spacing={3} sx={{ my: 2 }}>
        {sessionMsg && <ThurAlert severe={'info'} message={sessionMsg} />}
        {response && <ThurAlert severe={response.status ? 'success' : 'error'} message={response.message} />}
        <TextField name="email" label="Email address" onChange={emailChange} value={email} />
        <TextField
          name="password"
          label="Password"
          value={password}
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
        disabled={!enabled}
      >
        Login
      </LoadingButton>
      <Box>
        <Button sx={{ mt: 5 }} onClick={() => setDemos()} >
          Click to Fill Form
        </Button>
      </Box>
    </>
  );
}
