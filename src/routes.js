import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import PlansPage from './pages/PlansPage';
import VpnPage from './pages/VpnPage';
import SubscriptionPage from './pages/SubscriptionPage';
import DashboardAppPage from './pages/DashboardAppPage';
import RequireAuth from './layouts/RequireAuth';
// ----------------------------------------------------------------------

export default function Router() {
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
       
        { path: 'app', element:<DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'plans', element: <PlansPage /> },
        { path: 'vpn', element: <VpnPage /> },
        { path: 'subscriptions', element: <SubscriptionPage /> },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
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
