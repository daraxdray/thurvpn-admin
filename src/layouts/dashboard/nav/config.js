// component
// import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

// const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: 'ic:round-space-dashboard',
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: 'mdi:user-outline',
  },
  {
    title: 'plans',
    path: '/dashboard/plans',
    icon: 'ic:round-category',
  },
  {
    title: 'vpn',
    path: '/dashboard/vpn',
    icon: 'material-symbols:lock-open',
  },
  {
    title: 'Subscriptions',
    path: '/dashboard/subscriptions',
    icon: 'tabler:free-rights',
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];
const bottomNavConfig = [
  {
    title: 'Logout',
    path: '/login',
    icon: 'mdi:lock',
  },
];

export { navConfig, bottomNavConfig };
