import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
export default function VPNPage() {
  
  return (
    <>
      <Helmet>
        <title> Dashboard: VPN </title>
      </Helmet>

      <Outlet />

      
    </>
  );
}
