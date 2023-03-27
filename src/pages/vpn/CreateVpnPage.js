import { Helmet } from 'react-helmet-async';
// @mui
import {
  Container,
  Stack,
  Typography,
  Card,
  Grid,
  TextField
} from '@mui/material';
// sections
// mock


export default function CreateVpnPage() {

  return (
    <>
      <Helmet>
        <title> Dashboard: Create VPN </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Create VPN
          </Typography>

        </Stack>

        <Card>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
              <Grid item xs={6}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
              </Grid>
            </Grid>
          </form>
        </Card>

      </Container>

    </>
  );
}
