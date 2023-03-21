import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@mui/material';

const Logo = forwardRef(({ disabledLink = false, sx, ...otherProps }, ref) => {
  const logoSx = { width: 120, height: 40, cursor: 'pointer', ...sx };
  const logo = <Box component="img" src="/thur_logo.png" sx={logoSx} />;

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }} ref={ref} {...otherProps}>
      {logo}
    </Link>
  );
});

Logo.displayName = 'Logo';

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
