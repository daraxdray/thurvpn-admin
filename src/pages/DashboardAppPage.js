import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { getDashboardData } from '../repository/settings';
// @mui
// import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, CircularProgress } from '@mui/material';
// components
// import Iconify from '../components/iconify';
// sections
import { ListTile, AppOrderTimeline, AppWidgetSummary } from '../sections/@dashboard/app';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  // const [users, setUsers] = useState();
  const [totalVpn, setTotalVpn] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSubs, setSubs] = useState(0);
  const [totalPlans, setTotalPlans] = useState(0);
  const [totalDevices, setTotalDevices] = useState(0);

  const { isSuccess, isFetching } = useQuery({
    queryKey: ['get-dashboard'],
    queryFn: getDashboardData,
    onSuccess: (result) => {
      console.log('data', result);

      // setUsers(result.users);
      setTotalPlans(result.totalPlans);
      setSubs(result.subscriptions);
      setTotalVpn(result.totalVpn);
      setTotalUsers(result.totalUsers);
      setTotalDevices(result.totalDevices);
    },
  });

  return (
    <>
      <Helmet>
        <title> Dashboard | THURVPN </title>
      </Helmet>

      {isFetching && (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', mx: 'auto' }}>
          {' '}
          <CircularProgress color="success" sx={{ margin: 'auto' }} />{' '}
        </Container>
      )}
      {isSuccess && (
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome back
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Number of Users"
                total={totalUsers}
                common="dark"
                color="light"
                icon={'basil:user-outline'}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total VPN Server"
                total={totalVpn}
                color="info"
                common="light"
                icon={'basil:user-outline'}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Subscriptions"
                total={totalSubs}
                color="warning"
                common="light"
                icon={'ph:crown-fill'}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Total Plans"
                total={totalPlans}
                color="error"
                common="light"
                icon={'mdi:search-hands-free'}
              />
            </Grid>
         

            <Grid item xs={12} md={6} lg={8}>
              <ListTile
                title="Recently joined devices"
                list={[...totalDevices].splice(0,5).map((device, index) => ({
                  id: index,
                  title: device.deviceName,
                  description: device.deviceId,
                  image: `/assets/images/covers/cover_${index + 1}.jpg`,
                  postedAt: faker.date.recent(),
                }))}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppOrderTimeline
                title="Log"
                list={[...Array(5)].map((_, index) => ({
                  id: faker.datatype.uuid(),
                  title: [
                    'Created new user',
                    'New plans created',
                    'Subscription approved',
                    'Admin logged in',
                    'Server disabled',
                  ][index],
                  type: `order${index + 1}`,
                  time: faker.date.past(),
                }))}
              />
            </Grid>

            {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
         */}
          </Grid>
        </Container>
      )}
    </>
  );
}
