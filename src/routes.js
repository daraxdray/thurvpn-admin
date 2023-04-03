import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import PlansPage from './pages/PlansPage';
import SubscriptionPage from './pages/SubscriptionPage';
import DashboardAppPage from './pages/DashboardAppPage';
import RequireAuth from './layouts/RequireAuth';
import { CreateVpnPage, EditVpnPage, VpnPage, VPNListPage } from './pages/vpn/index.js';
// import { useDispatch } from 'react-redux';
// import { logout } from './store/slice/authSlice';
// ----------------------------------------------------------------------

export default function Router() {
  // const dispatch = useDispatch();
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" />,
      index: true,
    },
    {
      path: '/dashboard',
      element: (
        <RequireAuth>
          <DashboardLayout />
        </RequireAuth>
      ),
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'plans', element: <PlansPage /> },
        {
          path: 'vpn', element: <VpnPage />,
          children: [
            { element: <Navigate to="/dashboard/vpn/list" />, index: true },
            { path: 'list', element: <VPNListPage /> },
            { path: 'create', element: <CreateVpnPage /> },
            { path: 'edit/:id', element: <EditVpnPage /> },
          ]
        },

        { path: 'subscriptions', element: <SubscriptionPage /> },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    // {
    //   path: '/logout',
    //   element: <Navigate to={'/login'} />,
    //   render(h) {
    //     console.log(h);
    //     dispatch(logout);

    //   },
    // },
    {
      element: <SimpleLayout />,
      children: [
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
