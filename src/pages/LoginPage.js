import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Card, Box } from '@mui/material';
// hooks
// import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

import SD from '../utils/config';
// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    margin: 'auto',
    justifyContent: 'center',
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  // const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> {SD.loginTitle} </title>
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <Box sx={{ mx: 'auto', width: 'auto', padding: 1 }}>
            <Card sx={{ px: 5, mt: 5 }}>
              <StyledContent>
                <Logo
                  sx={{
                    position: 'relative',
                    margin: 'auto',
                    marginBottom: 5,
                  }}
                />

                <LoginForm />
              </StyledContent>
            </Card>
          </Box>
        </Container>
      </StyledRoot>
    </>
  );
}
