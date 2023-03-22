import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
// import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Divider } from '@mui/material';
// mock
// import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import { navConfig, bottomNavConfig } from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

// const StyledAccount = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(2, 2.5),
//   borderRadius: Number(theme.shape.borderRadius) * 1.5,
//   backgroundColor: alpha(theme.palette.grey[500], 0.12),
// }));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        backgroundColor: 'white',
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo  />
      </Box>

      <Box sx={{ mb: 2, mx: 2.5, mt: 4 }}>
        <Link underline="none">
          <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            MAIN MENU
          </Typography>
        </Link>
      </Box>

      <NavSection data={navConfig} />
      <Divider sx={{ borderStyle: 'dashed', mt: 20 }} />

      <NavSection data={bottomNavConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
